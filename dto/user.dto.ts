
import { RestResponseDto } from './rest-response.dto';

export class UserOutputDto {
  id!: string;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  email!: string;
  friends!: UserOutputDto[];
  followers!: UserOutputDto[];
  subscriptions!: UserOutputDto[];
  pictureUrl!: string
}

export class UserNameDto {
  firstName!: string;
  middleName!: string;
  lastName!: string;
}

export class UserDto extends UserNameDto {
  id!: string;
  email!: string;
  pictureUrl!: string;
}

export class UserResponseDto extends RestResponseDto {
  declare payload: UserDto;
}
