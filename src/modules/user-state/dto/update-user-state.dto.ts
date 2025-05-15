import { IsOptional, IsString, Min, Max, IsNumber } from 'class-validator';

export class UpdateUserStateDto {

  @IsOptional()
  @IsString()
  comentario?: string; //DEFINIR TIEMPO DENTRO DEL DIA Y QUE SE PUEDA MODIFICAR UNA SOLA VEZ

}
