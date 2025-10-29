import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { OrchestratorService } from './orchestrator.service';
import { Connection } from '../connections/entities/connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Connection]), HttpModule],
  providers: [OrchestratorService],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}
