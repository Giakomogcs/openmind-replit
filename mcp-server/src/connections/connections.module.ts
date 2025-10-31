import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConnectionsService } from './connections.service';
import { ConnectionsController } from './controllers/connections.controller';
import { Connection } from './entities/connection.entity';
import { OrchestratorModule } from '../orchestrator/orchestrator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection]),
    OrchestratorModule,
    ConfigModule,
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
})
export class ConnectionsModule {}
