import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, AdapterType } from './entities/connection.entity';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { OrchestratorService } from '../orchestrator/orchestrator.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConnectionsService {
  private readonly encryptionKey: string;

  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>,
    private readonly orchestratorService: OrchestratorService,
    private readonly configService: ConfigService,
  ) {
    this.encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  private decrypt(text: string): string {
    const textParts = text.split(':');
    const ivHex = textParts.shift();
    if (!ivHex) {
        throw new Error('Invalid encrypted text format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);
decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  async create(createConnectionDto: CreateConnectionDto): Promise<Connection> {
    const connection = new Connection();
    connection.nomeAmigavel = createConnectionDto.nomeAmigavel;
    connection.adapterType = AdapterType.REST;
    connection.adapterUrl = createConnectionDto.adapterUrl;

    if (createConnectionDto.credentials) {
      const credentialsString = JSON.stringify(createConnectionDto.credentials);
      connection.encryptedCredentials = this.encrypt(credentialsString);
    }

    const savedConnection = await this.connectionsRepository.save(connection);

    // @ts-ignore
    this.orchestratorService.startDiagnostic(savedConnection.id);

    return savedConnection;
  }
}
