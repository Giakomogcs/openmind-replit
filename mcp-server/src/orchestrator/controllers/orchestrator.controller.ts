import { Controller, Post, Body } from '@nestjs/common';
import { OrchestratorService } from '../services/orchestrator.service';

@Controller('api/orchestrate')
export class OrchestratorController {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  @Post()
  async orchestrate(
    @Body('message') message: string,
    @Body('projectId') projectId: number,
  ) {
    return this.orchestratorService.processMessage(message, projectId);
  }
}
