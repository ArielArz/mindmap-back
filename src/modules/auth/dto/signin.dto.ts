import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: 'Correo electronico del usuario',
        example: 'juan@gmail.com',
    })
    @IsEmail({}, {message: 'Debe ser un correo electronico valido'})
    @IsNotEmpty({ message: 'El correo electronico es obligatorio '})
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'MiClave123!'
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'la contraseña es obligatoria.'})
    password: string;
}