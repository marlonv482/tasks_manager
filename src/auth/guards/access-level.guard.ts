import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_LEVEL, ROLES } from 'src/constants';
import { PUBLIC_KEY, ROLES_KEY, ADMIN_KEY, ACCESS_LEVEL_KEY } from 'src/constants/key-decorators';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';
@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const accessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser, idUser } = req;
    console.log(admin)
    if (accessLevel === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        }

        if (admin && roleUser === admin) {
          return true;
        }

        throw new UnauthorizedException(
          'No tienes permiso para esta operacion',
        );
      }
    }

    if (roleUser === ROLES.ADMIN) {
      return true;
    }
    const user = await this.userService.getUserById(idUser);

    const userExistInProject = user.projectsIncludes.find((project) => {
      project.project.id == req.params.projectId;
    });
    
    if (userExistInProject === undefined) {
      throw new UnauthorizedException('No formas parte del proyecto');
    }
    if (ACCESS_LEVEL[accessLevel] !== userExistInProject.accessLevel) {
      throw new UnauthorizedException(
        'No tienes el nivel de acceso necesario en el proyecto',
      );
    }
    return true;
  }
}
