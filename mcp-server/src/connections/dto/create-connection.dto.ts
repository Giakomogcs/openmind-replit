import {
  IsString,
  IsEnum,
  IsOptional,
  IsUrl,
  IsNumber,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { AdapterType } from '../entities/connection.entity';

class CredentialsDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  password?: string;
}

export class CreateConnectionDto {
  @IsString()
  @IsNotEmpty()
  nomeAmigavel: string;

  @IsEnum(AdapterType)
  connectionType: AdapterType;

  @IsUrl()
  @ValidateIf((o) => o.connectionType === AdapterType.REST)
  @IsNotEmpty()
  adapterUrl: string;

  @IsString()
  @ValidateIf((o) => o.connectionType === AdapterType.POSTGRES)
  @IsNotEmpty()
  host: string;

  @IsNumber()
  @ValidateIf((o) => o.connectionType === AdapterType.POSTGRES)
  @IsNotEmpty()
  port: number;

  @IsString()
  @ValidateIf((o) => o.connectionType === AdapterType.POSTGRES)
  @IsNotEmpty()
  databaseName: string;

  @IsOptional()
  credentials?: CredentialsDto;
}
