import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsEntity } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';


@Module({
  imports:[  TypeOrmModule.forFeature([ProjectsEntity])],
  providers: [ProjectsService,UsersService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
