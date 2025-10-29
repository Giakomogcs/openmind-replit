import { Module, forwardRef } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { OrchestratorModule } from '../orchestrator/orchestrator.module';

@Module({
  imports: [forwardRef(() => OrchestratorModule)],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
