import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants';
import { IUser } from '../../interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from './usersProjects.entity';



@Entity({name:'users'})
export class UsersEntity extends BaseEntity implements IUser{
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column({unique:true})
    email:string;
    @Column({unique:true})
    userName:string;
    @Column()
    password:string;
    @Column({type:'enum',enum:ROLES})
    role:string;
    @Column()
    age:number;
    @OneToMany(()=>UsersProjectsEntity,(usersProjects)=>usersProjects.user)
    projectsIncludes:UsersProjectsEntity[]

}