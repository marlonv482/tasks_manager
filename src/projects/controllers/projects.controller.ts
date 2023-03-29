import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectsDTO, ProjectsUpdateDTO } from '../dto/projects.dto';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
    constructor(private projectsService:ProjectsService ){

    }
    @Get()
    public async getAllProjects(){
        return this.projectsService.getAllProjects();
    }

    @Get(':id')
    public async getProjectById(@Param('id') id:string){
        return this.projectsService.getProjectById(id);
    }

    @Post()
    public async createProject(@Body() body:ProjectsDTO){
        return this.projectsService.createProject(body);
    }
    @Delete(':id')
    public async deleteProject(@Param('id') id:string){
        return this.projectsService.deleteProject(id);
    }
    @Put(':id')
    public async updateProject(@Body() body:ProjectsUpdateDTO,@Param('id') id:string){
        return this.projectsService.updateProject(body,id);
    }
}
