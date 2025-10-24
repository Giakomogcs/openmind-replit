import { Module } from '@nestjs/common';
import { OrchestratorController } from '../controllers/orchestrator.controller';

@Module({
  providers: [],
  controllers: [OrchestratorController],
})
export class OrchestratorModule {}