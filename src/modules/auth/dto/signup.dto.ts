import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword";

export class SignUpDto {
    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez',
        minLength: 3,
        maxLength: 80,
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
    name: string;

    @ApiProperty({
        description: 'Correo electronico valido',
        example: 'juan@gmail.com'
    })
    @IsEmail({}, { message: 'El correo electrico no tiene un formato valido.' })
    @IsNotEmpty({ message: 'El correo electronico es obligatorio.' })
    email: string;

    @ApiProperty({
        description: 'Contraseña segura (8-15 caracteres, incluyendo una minuscula, una mayuscula, un numero y un caracter especial)',
        example: 'MiClave123!',
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
        { message: 'La contraseña debe tener entre 8 y 15 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*).' })
    password: string;

    @ApiProperty({
        description: 'Confirmacion de contraseña (debe coincidir con la contraseña)',
        example: 'MiClave123!'
    })
    @IsNotEmpty({ message: 'Confirmar la contraseña es obligatorio.' })
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @ApiPropertyOptional({ 
        description: 'Direccion del usuario (opcional)',
        example: 'Calle Falsa 123'
    })
    @IsString({ message: 'La direccion debe ser una cadena de texto.' })
    @IsOptional()
    @Length(3, 80, { message: 'La direccion debe tener cadena de texto.' })
    address?: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen de perfil (opcional)',
        example: 'https://cdn.pixabay.com/avatar.png'
    })
    @IsString({ message: 'La imagen de perfil debe ser una cadena de texto.' })
    @IsOptional()
    profileImage?: string;
    
}