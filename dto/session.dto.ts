import { RestResponseDto } from './rest-response.dto';

export class WhoAmIDto {
  id!: string;
  role!: number;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  email!: string;
  pictureUrl!: string;
}

export class WhoAmIResponseDto extends RestResponseDto {
  declare payload: WhoAmIDto;
}
