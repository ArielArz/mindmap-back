import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmotionDto {
  @ApiProperty({
    description: 'Nombre de la emoción',
    example: 'Alegría',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Significado o descripción de la emoción',
    example: 'Estado emocional placentero que suele aparecer como resultado de una experiencia positiva.',
  })
  @IsString()
  @IsNotEmpty()
  significado: string;

  @ApiProperty({
    description: 'Emoji representativo de la emoción',
    example: '😊',
  })
  @IsString()
  @IsNotEmpty()
  emoji: string;

  @ApiProperty({
    description: 'Valor clínico de la emoción. Marca la inluencia de la emocion, con valores entre -3 y 3',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  clinicalValue: number;

  @ApiProperty({
    description: 'Reflexión asociada a la emoción seleccionada por el usuario',
    example: 'Cuando siento alegría, me doy cuenta de que estoy en el presente y disfruto lo que tengo.',
  })
  @IsString()
  @IsNotEmpty()
  reflexion: string;


}