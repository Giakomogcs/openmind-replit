import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConnectionsService } from '../connections/connections.service';

@Injectable()
export class OrchestratorService {
    constructor(
        @Inject(forwardRef(() => ConnectionsService))
        private readonly connectionsService: ConnectionsService,
    ) {}
}
