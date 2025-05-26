import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { EmotionIntensity } from 'src/modules/emotions/entities/intensidad.enum';

export class CreateUserStateDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'ID del usuario',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'a9a1f34d-3b87-4eb0-845e-7483b3e9d8bc',
    description: 'ID de la emoción',
  })
  @IsUUID()
  @IsNotEmpty()
  emotionId: string;

  @ApiProperty({
    example: EmotionIntensity.media,
    enum: EmotionIntensity,
    enumName: 'EmotionIntensity',
    description: 'Intensidad de la emoción: muyBaja (1), baja (2), media (3), alta (4), muyAlta (5)',
  })
  @IsEnum(EmotionIntensity)
  @IsNotEmpty()
  intensidad: EmotionIntensity;

  @ApiProperty({
    example: 'Hoy me sentí muy motivada después del almuerzo',
    description: 'Comentario sobre el estado emocional',
  })
  @IsNotEmpty()
  @IsString()
  comentario: string;
}