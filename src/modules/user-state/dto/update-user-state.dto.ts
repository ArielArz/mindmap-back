import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Min, Max, IsNumber } from 'class-validator';

export class UpdateUserStateDto {

  @ApiPropertyOptional({
    example: 'Me siento un poco mejor ahora.',
    description: 'Comentario actualizado',
  })
  @IsOptional()
  @IsString()
  comentario?: string; //DEFINIR TIEMPO DENTRO DEL DIA Y QUE SE PUEDA MODIFICAR UNA SOLA VEZ

}
