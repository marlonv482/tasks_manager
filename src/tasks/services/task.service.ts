import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksDTO, TasksUpdateDTO } from '../dto/tasks.dto';
import { ErrorManager } from 'src/utils/errors.manager';
import { ProjectsService } from 'src/projects/services/projects.service';
import { ProjectsDTO } from 'src/projects/dto/projects.dto';

@Injectable()
export class TaskService {
  

    constructor(
        @InjectRepository(TasksEntity)
        private readonly taskRepository:Repository<TasksEntity>,
        private readonly projectsService:ProjectsService){
    }

    public async createTask(body:TasksDTO,projectId:string):Promise<TasksEntity>{
       try {
        const project:ProjectsDTO=await this.projectsService.getProjectById(projectId)
        return this.taskRepository.save({...body,project})
       } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
       }
    }
    async  deleteTask(id: string):Promise<DeleteResult> {
        throw new Error('Method not implemented.');
    }
    async updateTask(task: TasksUpdateDTO, id: string):Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }

    /**
     * 
     * @param id 
     */
    async getTaskById(id: string):Promise<TasksEntity> {
        try {
            const task: TasksEntity = await this.taskRepository
              .createQueryBuilder('task')
              .where({ id })
              .getOne();
            if (!task) {
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No se encontro el id',
              });
            }
            return task;
          } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
          }
    }
    
    /**
     * 
     * @returns TaskEntity[]
     */
    async getAllTask():Promise<TasksEntity[]> {
       try {
        const tasks:TasksEntity[]= await this.taskRepository.find()
        if (tasks.length === 0) {
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'No hay registros',
            });
          }
          return tasks;
       } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
       }
    }

    
}
