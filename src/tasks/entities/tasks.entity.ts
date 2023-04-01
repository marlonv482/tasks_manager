import { BaseEntity } from "../../config/base.entity";
import { STATUS_TASK } from "../../constants/status_task";
import { ProjectsEntity } from "../../projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name:'task'})
export class TasksEntity extends BaseEntity{
    @Column()
    taskName:string;

    @Column()
    taskDescription:string;

    @Column({type:'enum',enum:STATUS_TASK})
    status:STATUS_TASK;

    @Column()
    responsableName:string;

    @ManyToOne(()=>ProjectsEntity,(projects)=>projects.tasks)
    @JoinColumn({name:"project_id"})
    project:ProjectsEntity
} 