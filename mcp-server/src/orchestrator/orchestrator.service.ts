import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Connection, ConnectionStatus } from '../connections/entities/connection.entity';

@Injectable()
export class OrchestratorService {
  private readonly logger = new Logger(OrchestratorService.name);
  private genAI: GoogleGenerativeAI;

  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY is not configured. LLM features will be disabled.');
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  public async startDiagnostic(connectionId: string): Promise<void> {
    const connection = await this.connectionRepository.findOne({ where: { id: connectionId } });
    if (!connection || !connection.adapterUrl) {
      this.logger.error(`Connection ${connectionId} not found or has no URL.`);
      return;
    }

    try {
      const response = await firstValueFrom(this.httpService.get(connection.adapterUrl));
      const data = response.data;

      if (this.isOpenApiSpec(data)) {
        this.logger.log(`Processing OpenAPI spec for connection ${connectionId}`);
        connection.draftSpecification = data;
        connection.status = ConnectionStatus.PENDING_VALIDATION;
      } else if (this.genAI) {
        this.logger.log(`Using LLM to process documentation for connection ${connectionId}`);
        const schema = await this.generateSchemaFromDocumentation(data);
        connection.draftSpecification = schema;
        connection.status = ConnectionStatus.PENDING_VALIDATION;
      } else {
        throw new Error('Data is not a valid OpenAPI spec and LLM is not configured.');
      }

      await this.connectionRepository.save(connection);
    } catch (error) {
      this.logger.error(`Failed to diagnose connection ${connectionId}`, error.stack);
      connection.status = ConnectionStatus.ERROR;
      await this.connectionRepository.save(connection);
    }
  }

  private isOpenApiSpec(data: any): boolean {
    return data && (data.openapi || data.swagger);
  }

  private async generateSchemaFromDocumentation(documentation: string): Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `
      Analyze the following API documentation and generate a valid OpenAPI 3.0 specification in JSON format.
      The specification should include paths, methods, parameters, and basic response structures.
      Focus on extracting the core API endpoints and their functionality.

      Documentation:
      ---
      ${documentation.substring(0, 10000)}
      ---

      JSON OpenAPI 3.0 Specification:
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      // Clean up the response to ensure it's valid JSON
      const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonText);
    } catch (error) {
      this.logger.error('Error generating schema from LLM', error);
      throw new Error('Failed to generate schema from documentation using LLM.');
    }
  }
}
