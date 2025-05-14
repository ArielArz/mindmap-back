import { IsUUID, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateUserStateDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  emotionId: string;

  @IsDateString()
  date: string; // formato YYYY-MM-DD

  @IsOptional()
  @IsString()
  description?: string;
}
