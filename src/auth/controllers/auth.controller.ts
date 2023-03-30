import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { userName, password }: AuthDTO) {
    
    const userValidate =await  this.authService.validateUser(userName, password);
    if(!userValidate){
        throw new UnauthorizedException('Data not valid');
    }
    const jwt=await this.authService.generateJWT( userValidate);
   
    return jwt
  }
}
