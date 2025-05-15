import { IsEmail, IsNotEmpty, IsString, Length, Matches, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword";

export class SignUpDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
    name: string;

    @IsEmail({}, { message: 'El correo electrico no tiene un formato valido.' })
    @IsNotEmpty({ message: 'El correo electronico es obligatorio.' })
    email: string;

    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
        { message: 'La contraseña debe tener entre 8 y 15 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*).' })
    password: string;

    @IsNotEmpty({ message: 'Confirmar la contraseña es obligatorio.' })
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @IsString({ message: 'La direccion debe ser una cadena de texto.' })
    @Length(3, 80, { message: 'La direccion debe tener cadena de texto.' })
    address: string;

    @IsString({ message: 'La imagen de perfil debe ser una cadena de texto.' })
    profileImage: string;
    
}