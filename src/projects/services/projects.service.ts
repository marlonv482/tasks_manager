import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProjectsDTO, ProjectsUpdateDTO } from '../dto/projects.dto';
import { ProjectsEntity } from '../entities/project.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { ACCESS_LEVEL } from 'src/constants';
import { UsersService } from 'src/users/services/users.service';
import { HttpCustomService } from 'src/providers/http/http.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
    private readonly usersService:UsersService,
    @InjectRepository(UsersProjectsEntity)
    private readonly usersProjectRepository: Repository<UsersProjectsEntity>,
    private readonly httpService:HttpCustomService
  ) {}
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
  public async createProject(body: ProjectsDTO,userId:string): Promise<ProjectsEntity> {
    try {
      const user=await this.usersService.getUserById(userId)
      const project=await this.projectRepository.save(body);
      await this.usersProjectRepository.save(
       { accessLevel:ACCESS_LEVEL.OWNER,
      user:user,
    project}
      )
      return project;
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
        .leftJoinAndSelect('project.usersIncludes','usersIncludes')
        .leftJoinAndSelect('usersIncludes.user','user')
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

  public async listApi(){
    return await this.httpService.findAll();
  }
}
