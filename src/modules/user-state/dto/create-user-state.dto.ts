import { IsUUID, IsDateString, IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserStateDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  emotionId: string;

  @IsNumber()
  @IsNotEmpty()
  intensidad?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
