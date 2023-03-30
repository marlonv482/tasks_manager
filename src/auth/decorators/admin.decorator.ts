import { ADMIN_KEY } from './../../constants/key-decorators';
import {SetMetadata} from '@nestjs/common'

export const Admin=()=>SetMetadata(ADMIN_KEY,true)