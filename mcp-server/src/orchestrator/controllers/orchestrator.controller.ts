import { Controller, Post, Body } from '@nestjs/common';
import { OrchestratorService } from '../services/orchestrator.service';

@Controller('orchestrate')
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
