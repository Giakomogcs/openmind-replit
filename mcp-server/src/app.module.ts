import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { McpModule } from '@nestjs-mcp/server';

import { AuthModule } from './auth/modules/auth.module';
import { OrchestratorModule } from './orchestrator/orchestrator.module';
import { ProvisionerModule } from './provisioner/provisioner.module';
import { ConnectionsModule } from './connections/connections.module';
import { User } from './auth/entities/user.entity';
import { Connection } from './connections/entities/connection.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mcp-db.sqlite',
      entities: [User, Connection, Project],
      synchronize: true,
    }),
    McpModule.forRoot({
      name: 'mcp-server',
      version: '0.0.1',
    }),
    AuthModule,
    OrchestratorModule,
    ProvisionerModule,
    ConnectionsModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
