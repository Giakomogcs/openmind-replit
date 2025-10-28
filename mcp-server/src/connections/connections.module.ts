import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsService } from './connections.service';
import { ConnectionsController } from './connections.controller';
import { Connection } from './entities/connection.entity';
import { OrchestratorModule } from '../orchestrator/orchestrator.module';

@Module({
  imports: [TypeOrmModule.forFeature([Connection]), OrchestratorModule],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
})
export class ConnectionsModule {}
