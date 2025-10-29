import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(name: string): Promise<Project> {
    const project = this.projectRepository.create({ name });
    return this.projectRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['connections'] });
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id }, relations: ['connections'] });
  }

  async update(id: number, name: string): Promise<Project> {
    await this.projectRepository.update(id, { name });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
