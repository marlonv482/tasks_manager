import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AuthBody } from './../interfaces/auth.interface';
export class AuthDTO implements AuthBody{
    @ApiProperty()
    @IsNotEmpty()
    userName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}