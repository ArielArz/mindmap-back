import { IsUUID, IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { EmotionIntensity } from 'src/modules/emotions/entities/intensidad.enum';

export class CreateUserStateDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  emotionId: string;

  @IsEnum(EmotionIntensity)
  @IsNotEmpty()
  intensidad: EmotionIntensity;

  @IsNotEmpty()
  @IsString()
  comentario: string;
}