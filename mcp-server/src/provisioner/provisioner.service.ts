import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class ProvisionerService implements OnModuleInit {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async onModuleInit() {
    const defaultProject = await this.projectRepository.findOne({ where: { id: 1 } });
    if (!defaultProject) {
      const newProject = this.projectRepository.create({
        name: 'Default Project',
      });
      await this.projectRepository.save(newProject);
      console.log('Default project created.');
    }
  }
}
