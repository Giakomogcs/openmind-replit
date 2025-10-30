import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvisionerService } from './provisioner.service';
import { Project } from '../projects/entities/project.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ProjectsModule],
  providers: [ProvisionerService],
})
export class ProvisionerModule {}
