import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum ConnectionStatus {
  DIAGNOSING = 'DIAGNOSING',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  PROVISIONING = 'PROVISIONING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ERROR = 'ERROR',
}

export enum AdapterType {
  REST = 'REST',
  POSTGRES = 'POSTGRES',
}

@Entity({ name: 'connections' })
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  userId: User;

  @Column()
  nomeAmigavel: string;

  @Column({
    type: 'enum',
    enum: ConnectionStatus,
    default: ConnectionStatus.DIAGNOSING,
  })
  status: ConnectionStatus;

  @Column({
    type: 'enum',
    enum: AdapterType,
  })
  adapterType: AdapterType;

  @Column({ nullable: true })
  adapterUrl: string;

  @Column()
  encryptedCredentials: string;

  @Column({ type: 'jsonb', nullable: true })
  draftSpecification: any;

  @Column({ type: 'jsonb', nullable: true })
  finalSpecification: any;
}