import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  significado: string;

  @IsString()
  @IsNotEmpty()
  emoji: string;

  @IsNumber()
  @IsNotEmpty()
  clinicalValue: number;

  @IsString()
  @IsNotEmpty()
  reflexion: string;


}