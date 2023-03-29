
import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants";
import { ProjectsEntity } from "../../projects/entities/project.entity";
import {  Column, Entity, ManyToOne } from "typeorm";
import { UsersEntity } from "./user.entity";

@Entity({name:'users_projets'})
export class UsersProjectsEntity extends BaseEntity  {
    @Column({type:'enum',enum:ACCESS_LEVEL})
    accessLevel:ACCESS_LEVEL;

    @ManyToOne(()=>UsersEntity,(user)=>user.projectIncludes)
    user:UsersEntity;

    @ManyToOne(()=>ProjectsEntity,(project)=>project.userIncludes)
    project:ProjectsEntity
}