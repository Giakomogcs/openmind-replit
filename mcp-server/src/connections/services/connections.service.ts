import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from '../entities/connection.entity';
import { OrchestratorService } from '../../orchestrator/services/orchestrator.service';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>,
    private orchestratorService: OrchestratorService,
  ) {}

  async create(connection: Connection): Promise<Connection> {
    const newConnection = this.connectionsRepository.create(connection);
    await this.connectionsRepository.save(newConnection);
    try {
      const draftSpecification = await this.orchestratorService.diagnose(
        newConnection,
      );
      newConnection.draftSpecification = draftSpecification;
      newConnection.status = 'PENDING_VALIDATION';
      await this.connectionsRepository.save(newConnection);
    } catch (error) {
      newConnection.status = 'ERROR';
      await this.connectionsRepository.save(newConnection);
    }
    return newConnection;
  }
}
