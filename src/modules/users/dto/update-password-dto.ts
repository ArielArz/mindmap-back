import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword";

export class UpdatePasswordDto {
  @ApiProperty({ example: 'Actual123!' })
  @IsString({ message: 'La contraseña actual debe ser una cadena de texto.' })
  currentPassword: string;

  @ApiProperty({ example: 'Nueva123!' })
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, {
    message:
      'La contraseña debe tener entre 8 y 20 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial (!@#$%&*).',
  })
  password: string;

  @ApiProperty({ example: 'Nueva123!' })
  @Validate(MatchPassword, ['password'], {
    message: 'La confirmación de la contraseña no coincide.',
  })
  confirmPassword: string;
}
