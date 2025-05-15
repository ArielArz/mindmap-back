import { IsUUID, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserStateDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  emotionId: string;

  @IsNumber()
  @IsNotEmpty()
  intensidad?: number; //VER SI SIGUE O COMO LO USAMOS

  @IsNotEmpty()
  @IsString()
  comentario: string;
}