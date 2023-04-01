import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { TasksDTO, TasksUpdateDTO } from '../dto/tasks.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorators';

@Controller('task')
@ApiTags('Tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @AccessLevel('DEVELOPER')
  @Post(':projectId')
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: string,
  ) {
    return await this.taskService.createTask(body, projectId);
  }

  @Get()
  public async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @Get(':taskId')
  public async getTaskById(@Param('taskId') id: string) {
    return await this.taskService.getTaskById(id);
  }

  @Put(':taskId')
  async updateTask(@Body() task: TasksUpdateDTO, @Param('taskId') id: string) {
    return await this.taskService.updateTask(task, id);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') id: string) {
    return await this.taskService.deleteTask(id);
  }
}
