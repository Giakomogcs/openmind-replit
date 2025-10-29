import { Module, forwardRef } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { ConnectionsModule } from '../connections/connections.module';

@Module({
  imports: [forwardRef(() => ConnectionsModule)],
  providers: [OrchestratorService],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}
