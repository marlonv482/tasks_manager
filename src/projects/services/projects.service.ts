import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProjectsDTO, ProjectsUpdateDTO } from '../dto/projects.dto';
import { ProjectsEntity } from '../entities/project.entity';

@Injectable()
export class ProjectsService {
  /**
   *
   * @param id
   * @returns
   */
  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  /**
   *
   * @param body
   * @param id
   * @returns
   */
  public async updateProject(
    body: ProjectsUpdateDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizaron los registros',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
/**
 * 
 * @param body 
 * @returns 
 */
  public async createProject(body: ProjectsDTO): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  /**
   * 
   * @param id 
   */
  public async getProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project:ProjectsEntity= await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
        if(!project){
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se encontro el id',
          });
        } 
        return project;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }

  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}


  /**
   * 
   * @returns ProjectsEntity[]
   */
  async getAllProjects(): Promise<ProjectsEntity[]> {
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
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
