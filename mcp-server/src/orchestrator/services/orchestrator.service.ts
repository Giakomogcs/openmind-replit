import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, ConnectionStatus } from '../../connections/entities/connection.entity';
import axios from 'axios';

@Injectable()
export class OrchestratorService {
  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>,
  ) {}

  async startDiagnostic(connectionId: string) {
    console.log(`Starting diagnostic for connection ${connectionId}`);
    const connection = await this.connectionsRepository.findOne({ where: { id: connectionId } });

    if (!connection) {
      console.error(`Connection with id ${connectionId} not found`);
      return;
    }

    try {
      const response = await axios.get(connection.adapterUrl);
      connection.draftSpecification = response.data;
      connection.status = ConnectionStatus.PENDING_VALIDATION;
    } catch (error) {
      console.error(`Failed to fetch OpenAPI specification from ${connection.adapterUrl}`, error);
      connection.status = ConnectionStatus.ERROR;
    }

    await this.connectionsRepository.save(connection);
  }
}
