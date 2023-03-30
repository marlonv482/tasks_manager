import { ROLES_KEY } from './../../constants/key-decorators';
import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/constants';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, true);
