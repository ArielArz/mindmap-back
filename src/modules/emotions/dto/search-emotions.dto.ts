import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchEmotionsDto {
  @ApiPropertyOptional({
    description:
      'Término de búsqueda para filtrar emociones por nombre o valor clínico',
    example: 'alegría',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
