import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class SetPasswordDto {
    @ApiProperty({
      description: 'Correo electronico del usuario registrado con Google',
      example: 'usuario@gmail.com'
    })  
    @IsEmail({}, { message: 'El correo electronico no tiene un formato valido' })
    email: string;

    @ApiProperty({
      description: 'Nueva contraseña segura que el usuario desea establecer',
      example: 'MiNuevaClave123!',
    })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacia.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
    {
      message:
        'La contraseña debe tener entre 8 y 15 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial.',
    },
  )
  newPassword: string;

  @ApiProperty({
    description: 'Confirmacion exacta de la nueva contraseña',
    example: 'MiNuevaClave123!',
  })
  @IsNotEmpty({ message: 'La confirmacion de la contraseña es obligatoria.' })
  confirmPassword: string;
}