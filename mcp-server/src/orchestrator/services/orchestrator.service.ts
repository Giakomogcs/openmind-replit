import { Injectable, Logger } from '@nestjs/common';
import { Connection } from '../../connections/entities/connection.entity';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class OrchestratorService {
  private readonly logger = new Logger(OrchestratorService.name);
  private readonly genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async diagnose(connection: Connection): Promise<any> {
    this.logger.log(`Starting diagnosis for connection: ${connection.nomeAmigavel}`);
    let spec = await this.findOpenApiSpec(connection.adapterUrl);
    if (!spec) {
      spec = { openapi: '3.0.0', info: { title: 'Guessed API', version: '1.0.0' }, paths: {} };
    }
    const docs = await this.scrapeDocs(connection.adapterUrl);
    let enrichedSpec = await this.enrichSpecWithLLM(spec, docs);
    enrichedSpec = await this.guessEndpoints(connection.adapterUrl, enrichedSpec);
    return enrichedSpec;
  }

  private async enrichSpecWithLLM(spec: any, docs: string): Promise<any> {
    this.logger.log('Enriching spec with LLM');
    if (!docs) {
      return spec;
    }
    const prompt = `
      Here is an OpenAPI specification:
      ${JSON.stringify(spec)}

      And here is some documentation:
      ${docs}

      Please merge the documentation into the OpenAPI specification, adding descriptions and examples where appropriate.
      The output should be a valid OpenAPI 3.0.0 specification in JSON format.
    `;
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const content = response.text();
      if (content) {
        const enrichedSpec = JSON.parse(content);
        return enrichedSpec;
      }
      return spec;
    } catch (error) {
      this.logger.error('Error enriching spec with LLM', error);
      return spec;
    }
  }

  private async scrapeDocs(baseUrl: string): Promise<string> {
    try {
      this.logger.log(`Scraping docs from: ${baseUrl}/docs`);
      const { data } = await axios.get(`${baseUrl}/docs`);
      const $ = cheerio.load(data);
      return $('body').text();
    } catch (error) {
      this.logger.log(`Could not scrape docs from: ${baseUrl}/docs`);
      return '';
    }
  }

  private async guessEndpoints(baseUrl: string, spec: any): Promise<any> {
    const commonEndpoints = ['/users', '/tasks', '/products', '/posts', '/todos'];
    for (const endpoint of commonEndpoints) {
      if (!spec.paths[endpoint]) {
        try {
          const url = `${baseUrl}${endpoint}`;
          this.logger.log(`Guessing endpoint: ${url}`);
          const response = await axios.get(url);
          if (response.status === 200) {
            this.logger.log(`Successfully guessed endpoint: ${url}`);
            spec.paths[endpoint] = {
              get: {
                summary: `Guessed GET for ${endpoint}`,
                responses: {
                  '200': {
                    description: 'Successful response',
                  },
                },
              },
            };
          }
        } catch (error) {
          // Ignore
        }
      }
    }
    return spec;
  }

  private async findOpenApiSpec(baseUrl: string): Promise<any> {
    const commonSpecPaths = [
      '/openapi.json',
      '/swagger.json',
      '/api-docs.json',
      '/v1/api-docs.json',
      '/v2/api-docs.json',
      '/v3/api-docs.json',
    ];

    for (const path of commonSpecPaths) {
      try {
        const url = `${baseUrl}${path}`;
        this.logger.log(`Trying to fetch OpenAPI spec from: ${url}`);
        const response = await axios.get(url);
        if (response.status === 200 && response.data) {
          this.logger.log(`Successfully fetched OpenAPI spec from: ${url}`);
          return response.data;
        }
      } catch (error) {
        // Ignore errors and try the next path
      }
    }

    this.logger.log(`Could not find any OpenAPI spec for baseUrl: ${baseUrl}`);
    return null;
  }
}
