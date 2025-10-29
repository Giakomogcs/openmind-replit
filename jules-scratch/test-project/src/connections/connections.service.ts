import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrchestratorService } from '../orchestrator/orchestrator.service';

@Injectable()
export class ConnectionsService {
    constructor(
        @Inject(forwardRef(() => OrchestratorService))
        private readonly orchestratorService: OrchestratorService,
    ) {}
}
