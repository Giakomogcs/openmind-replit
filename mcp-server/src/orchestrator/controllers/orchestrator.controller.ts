import { Controller, Post, Body } from '@nestjs/common';
import { OrchestratorService } from '../services/orchestrator.service';
import { Connection } from '../../connections/entities/connection.entity';

@Controller('orchestrate')
export class OrchestratorController {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  @Post()
  orchestrate(@Body() connection: Connection) {
    return this.orchestratorService.diagnose(connection);
  }
}