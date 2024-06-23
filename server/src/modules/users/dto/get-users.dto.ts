import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsersDto {
  @Type(() => Number)
  @IsInt()
  page: number;

  @Type(() => Number)
  @IsInt()
  count: number;
}