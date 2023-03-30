import { ACCESS_LEVEL_KEY } from './../../constants/key-decorators';
import {SetMetadata} from '@nestjs/common'

export const AccessLevel=()=>SetMetadata(ACCESS_LEVEL_KEY,true)