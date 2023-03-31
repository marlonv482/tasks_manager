import { ACCESS_LEVEL } from 'src/constants';
import { ACCESS_LEVEL_KEY } from './../../constants/key-decorators';
import { SetMetadata } from '@nestjs/common';

export const AccessLevel = (level: keyof typeof ACCESS_LEVEL) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
