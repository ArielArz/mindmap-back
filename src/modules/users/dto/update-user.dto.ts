import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, Validate, Matches, IsString, Length, IsEmail } from 'class-validator';
import { UserDto } from './create-user.dto';
import { MatchPassword } from 'src/decorators/matchPassword';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(UserDto) {
  @ApiProperty({ example: 'Rosalía Fernández' })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name?: string;

  @ApiProperty({ example: 'rosalia@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  email?: string;

  @ApiProperty({ example: 'Av. Siempre Viva 742, Rosario' })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres.' })
  address?: string;

  @ApiProperty({ example: 'https://miapp.com/images/perfil/rosalia.png' })
  @IsOptional()
  @IsString({ message: 'La imagen de perfil debe ser una cadena de texto.' })
  profileImage?: string;
}
