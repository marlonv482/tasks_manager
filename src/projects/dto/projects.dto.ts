import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsOptional } from "class-validator";

export class ProjectsDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description:string;
}
export class ProjectsUpdateDTO{
    @IsOptional()
    @IsString()
    @ApiProperty()
    name:string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    description:string;
}