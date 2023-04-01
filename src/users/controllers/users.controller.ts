import { UserDTO, UserToProjectDTO, UserUpdateDTO } from './../dto/user.dto';
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
import { UsersService } from '../services/users.service';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicAcces } from 'src/auth/decorators/public.decorator';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAcces()
  @Get('getAllUsers')
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @PublicAcces()
  @Post('register')
  public async createUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @ApiParam({
    name: 'id',
  })
  @Put(':id')
  @AdminAccess()
  public async updateUser(
    @Body() body: UserUpdateDTO,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser(body, id);
  }
  @ApiParam({
    name: 'id',
  })
  @ApiHeader({
    name:"access_token"
  })
  @Delete(':id')
  public async deleteUser(@Param(':id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('add-to-project')
  public async addToProject(@Body() body: UserToProjectDTO) {
    return await this.usersService.relationToProject(body);
  }
}
