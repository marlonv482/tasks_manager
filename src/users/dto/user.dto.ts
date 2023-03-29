import { UsersEntity } from './../entities/user.entity';
import { IsNotEmpty,IsString,IsEmail,IsNumber,IsEnum ,IsOptional, IsUUID} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ACCESS_LEVEL, ROLES } from "../../constants";
import { ProjectsEntity } from 'src/projects/entities/project.entity';

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName:string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    age:number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userName:string;
   
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password:string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    @ApiProperty()
    role:ROLES;
    
}

export class UserUpdateDTO{
    @IsOptional()
    @IsString()
    @ApiProperty()
    firstName:string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    lastName:string;

    @IsOptional()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    age:number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    userName:string;
   
    @IsOptional()
    @IsString()
    
    password:string;

    @IsOptional()
    @IsEnum(ROLES)
    @ApiProperty()
    role:ROLES;
    
}

export class UserToProjectDTO{
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    user:UsersEntity;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    project:ProjectsEntity;



    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    @ApiProperty()
    accessLevel:ACCESS_LEVEL;
    
}