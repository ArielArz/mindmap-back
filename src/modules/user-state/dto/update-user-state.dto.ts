import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class UpdateUserStateDto {

  @IsOptional()
  @IsString()
  description?: string;
}
