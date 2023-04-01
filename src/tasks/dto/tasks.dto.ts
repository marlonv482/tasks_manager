import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { STATUS_TASK } from "../../constants/status_task";
import { ProjectsDTO } from "../../projects/dto/projects.dto";

export class TasksDTO{
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    taskName:string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    taskDescription:string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(STATUS_TASK)
    status:STATUS_TASK;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    responsableName:string;

   @IsOptional()
    project:ProjectsDTO
}

export class TasksUpdateDTO{
    @IsOptional()
    @ApiProperty()
    @IsString()
    taskName:string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    taskDescription:string;

    @IsOptional()
    @ApiProperty()
    @IsEnum(STATUS_TASK)
    status:STATUS_TASK;

    @IsOptional()
    @ApiProperty()
    @IsString()
    responsableName:string;

    @IsOptional()
    project:ProjectsDTO
  
}