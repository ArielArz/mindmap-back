import { IsOptional, IsString, Min, Max, IsNumber } from 'class-validator';

export class UpdateUserStateDto {

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsOptional()
  intensidad?: number;

  //emotionId del update

}
