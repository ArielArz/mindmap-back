import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class SetPasswordDto {
    @IsEmail({}, { message: 'El correo electronico no tiene un formato valido' })
    email: string;

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

  @IsNotEmpty({ message: 'La confirmacion de la contraseña es obligatoria.' })
  confirmPassword: string;
}