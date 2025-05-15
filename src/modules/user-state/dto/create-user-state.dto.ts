import { IsUUID, IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateUserStateDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  emotionId: string;

  @IsNumber()
  @IsOptional()
  intensidad?: number;

  @IsDateString()
  date: string; // formato YYYY-MM-DD

  @IsOptional()
  @IsString()
  description?: string;
}
