import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsService } from '../services/connections.service';
import { ConnectionsController } from '../controllers/connections.controller';
import { Connection } from '../entities/connection.entity';
import { OrchestratorModule } from '../../orchestrator/modules/orchestrator.module';
import { OrchestratorService } from '../../orchestrator/services/orchestrator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Connection]), OrchestratorModule],
  providers: [ConnectionsService],
  controllers: [ConnectionsController],
})
export class ConnectionsModule {}
