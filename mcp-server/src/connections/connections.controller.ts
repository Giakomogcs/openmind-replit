import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createConnectionDto: CreateConnectionDto) {
    return this.connectionsService.create(createConnectionDto);
  }
}
