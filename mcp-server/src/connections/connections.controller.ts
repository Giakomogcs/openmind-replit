import { Controller, Post, Body } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  create(@Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionsService.create(createConnectionDto);
  }
}
