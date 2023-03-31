import { ADMIN_KEY } from './../../constants/key-decorators';
import {SetMetadata} from '@nestjs/common'
import { ROLES } from 'src/constants';

export const AdminAccess =()=>SetMetadata(ADMIN_KEY,ROLES.ADMIN)