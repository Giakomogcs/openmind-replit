import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Connection,
  ConnectionStatus,
} from '../../connections/entities/connection.entity';
import { Project } from '../../projects/entities/project.entity';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAPIParser from '@readme/openapi-parser';

@Injectable()
export class OrchestratorService {
  private readonly genAI: GoogleGenerativeAI;

  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async startDiagnostic(connectionId: string) {
    console.log(`Starting diagnostic for connection ${connectionId}`);
    const connection = await this.connectionsRepository.findOne({
      where: { id: connectionId },
    });

    if (!connection) {
      console.error(`Connection with id ${connectionId} not found`);
      return;
    }

    try {
      const parser = new OpenAPIParser();
      const api = await parser.validate(connection.adapterUrl);
      console.log(
        'API name: %s, Version: %s',
        api.info.title,
        api.info.version,
      );

      connection.draftSpecification = api;
      connection.status = ConnectionStatus.PENDING_VALIDATION;
    } catch (error) {
      console.error(
        `Failed to fetch or parse OpenAPI specification from ${connection.adapterUrl}`,
        error,
      );
      connection.status = ConnectionStatus.ERROR;
    }

    await this.connectionsRepository.save(connection);
  }

  async processMessage(message: string, projectId: number): Promise<any> {
    try {
      const project = await this.projectsRepository.findOne({
        where: { id: projectId },
        relations: ['connections'],
      });

      if (!project) {
        throw new Error(`Project with id ${projectId} not found`);
      }

      if (message.toLowerCase() === 'hello') {
        if (project.connections.length > 0) {
          return {
            message:
              'Welcome back! I see you have some connections set up. What would you like to build today?',
          };
        } else {
          return {
            message:
              "Welcome! It looks like you don't have any connections set up yet. Head over to the connections page to get started.",
          };
        }
      }

      const context = project.connections
        .map((c) => JSON.stringify(c.draftSpecification))
        .join('\n');
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const result = await model.generateContent(`${context}\n\n${message}`);
      const response = await result.response;
      const text = response.text();
      return { message: text };
    } catch (error) {
      console.error('Error processing message with Gemini:', error);
      return { message: 'Error processing your message. Please try again.' };
    }
  }
}
