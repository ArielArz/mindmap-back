import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword';

export class UserDto {
  @ApiProperty({ example: 'Rosalía Fernández' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  @ApiProperty({ example: 'rosalia@example.com' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @ApiProperty({ example: 'ContraSegura123!' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'La contraseña debe tener entre 8 y 20 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*).',
    },
  )
  password: string;

  @ApiProperty({ example: 'ContraSegura123!' })
  @IsNotEmpty({ message: 'Confirmar la contraseña es obligatorio.' })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 742, Rosario' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @IsOptional()
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address?: string;

  @ApiPropertyOptional({ example: 'https://miapp.com/images/perfil/rosalia.png' })
  @IsOptional()
  @IsString({ message: 'La imagen de perfil debe ser una cadena de texto.' })
  profileImage?: string;
}
