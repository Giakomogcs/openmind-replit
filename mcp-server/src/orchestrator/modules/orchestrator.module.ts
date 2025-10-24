import { Module } from '@nestjs/common';
import { OrchestratorController } from '../controllers/orchestrator.controller';
import { OrchestratorService } from '../services/orchestrator.service';

@Module({
  providers: [OrchestratorService],
  controllers: [OrchestratorController],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}