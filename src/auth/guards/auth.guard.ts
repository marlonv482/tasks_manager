import { useToken } from './../../utils/use.token';
import { PUBLIC_KEY } from './../../constants/key-decorators';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/services/users.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private readonly userService:UsersService,
    private readonly reflector:Reflector
  ){

  }
 async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic=this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if(isPublic){
      return true
    }
    const req=context.switchToHttp().getRequest<Request>()

    const token=req.headers['codrr_token']

    if(!token || Array.isArray(token)){
      throw new UnauthorizedException('Invalid Token');
    }
    const manageToken:IUseToken | string =useToken(token)

    if(typeof manageToken==='string'){
      throw new UnauthorizedException(manageToken)
    }

    if(manageToken.isExpired){
      throw new UnauthorizedException('Invalid Token');
    }
    const {sub}=manageToken;
    const user=await this.userService.getUserById(sub)

    if(!user){
      throw new UnauthorizedException('Invalid User');
    }
    //req.idUser=user.id
    //req.roleUser=user.role
    return true;
  }
}
