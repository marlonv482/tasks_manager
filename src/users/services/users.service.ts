import { UsersProjectsEntity } from './../entities/usersProjects.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from './../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/user.entity';
import { ErrorManager } from 'src/utils/errors.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity) private readonly usersProjectsEntity:Repository<UsersProjectsEntity>
  ) {}
 

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }

  public async getAllUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay registros',
        });
      }
      return users;
    } catch (error) {
     
      throw  ErrorManager.createSignatureError(error.message);
    }
  }
  public async getUserById(id: string): Promise<UsersEntity> {
    try {
      const user:UsersEntity= await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes','projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project','project')
        .getOne();
        if(!user){
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se encontro el id',
          });
        } 
        return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizaron los registros',
        });
      }
      return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }
  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToProject(body: UserToProjectDTO): Promise<UsersProjectsEntity> {
    try {
      return await this.usersProjectsEntity.save(body);
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }
}
