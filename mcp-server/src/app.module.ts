import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { McpModule } from '@nestjs-mcp/server';

import { AuthModule } from './auth/modules/auth.module';
import { OrchestratorModule } from './orchestrator/modules/orchestrator.module';
import { ProvisionerModule } from './provisioner/modules/provisioner.module';
import { User } from './auth/entities/user.entity';
import { Connection } from './connections/entities/connection.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Connection],
        synchronize: true, // Auto-create tables (for development)
      }),
    }),
    McpModule.forRoot({
      name: 'mcp-server',
      version: '0.0.1',
    }),
    AuthModule,
    OrchestratorModule,
    ProvisionerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}