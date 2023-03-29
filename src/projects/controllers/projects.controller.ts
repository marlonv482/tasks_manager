import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
    constructor(private projectsService:ProjectsService ){

    }
    @Get()
    public async getAllProjects(){
        return this.projectsService.getAllProjects();
    }
}
