import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectsDTO, ProjectsUpdateDTO } from '../dto/projects.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorators';

@Controller('projects')
@ApiTags('Projects')
@UseGuards(AuthGuard,RolesGuard,AccessLevelGuard)
export class ProjectsController {
    constructor(private projectsService:ProjectsService ){

    }
    @Get()
    public async getAllProjects(){
        return this.projectsService.getAllProjects();
    }

    @AccessLevel('OWNER')
    @Get(':projectId')
    public async getProjectById(@Param('projectId') id:string){
        return this.projectsService.getProjectById(id);
    }

    @Post()
    public async createProject(@Body() body:ProjectsDTO){
        return this.projectsService.createProject(body);
    }
    @Delete(':projectId')
    public async deleteProject(@Param('projectId') id:string){
        return this.projectsService.deleteProject(id);
    }
    @Put(':projectId')
    public async updateProject(@Body() body:ProjectsUpdateDTO,@Param('projectId') id:string){
        return this.projectsService.updateProject(body,id);
    }
}
