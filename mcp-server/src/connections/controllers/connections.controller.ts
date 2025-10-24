import { Controller, Post, Body } from '@nestjs/common';
import { ConnectionsService } from '../services/connections.service';
import { Connection } from '../entities/connection.entity';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  create(@Body() connection: Connection): Promise<Connection> {
    return this.connectionsService.create(connection);
  }
}
