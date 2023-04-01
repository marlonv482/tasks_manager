import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TasksEntity } from './entities/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/services/projects.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService,ProjectsService],
  imports:[
    TypeOrmModule.forFeature([TasksEntity,ProjectsEntity])
  ]
})
export class TasksModule {}
