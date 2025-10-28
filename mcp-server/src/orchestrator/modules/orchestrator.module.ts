import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrchestratorController } from '../controllers/orchestrator.controller';
import { OrchestratorService } from '../services/orchestrator.service';
import { Connection } from '../../connections/entities/connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  providers: [OrchestratorService],
  controllers: [OrchestratorController],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}