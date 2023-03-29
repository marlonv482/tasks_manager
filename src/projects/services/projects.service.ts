import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { Repository } from 'typeorm';
import { ProjectsEntity } from '../entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectRepository: Repository<ProjectsEntity>,
    ){

    }
    async getAllProjects():Promise<ProjectsEntity[]> {
        try {
            const projects: ProjectsEntity[] = await this.projectRepository.find();
            if (projects.length === 0) {
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No hay registros',
              });
            }
            return projects;
          } catch (error) {
           
            throw  ErrorManager.createSignatureError(error.message);
          }
    }
}
