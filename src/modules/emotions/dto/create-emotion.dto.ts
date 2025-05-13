import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}