export enum ResponseStatusEnum {
  SUCCESS = 'success',
  ERROR = 'error',
}

export class RestResponseDto {
  status!: ResponseStatusEnum;
  payload?: any;
}

export class RestListResponseDto extends RestResponseDto {
  total!: number;
  offset!: number;
  limit!: number;
  declare payload?: any[];
}
