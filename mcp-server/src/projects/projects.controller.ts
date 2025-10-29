import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: { name: string }): Promise<Project> {
    return this.projectsService.create(createProjectDto.name);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: { name: string }): Promise<Project> {
    return this.projectsService.update(+id, updateProjectDto.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }
}
