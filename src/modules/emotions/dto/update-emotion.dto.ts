
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateEmotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  significado: string;

}