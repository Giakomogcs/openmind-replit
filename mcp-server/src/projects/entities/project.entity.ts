import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Connection } from '../../connections/entities/connection.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Connection, (connection: Connection) => connection.project)
  connections: Connection[];
}
