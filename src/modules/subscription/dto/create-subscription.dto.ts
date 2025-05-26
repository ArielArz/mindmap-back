import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'ID del usuario que realizará la suscripción',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID de la sesión de Stripe generada en el front',
    example: 'cs_test_a1b2c3d4e5f6g7h8i9j0',
  })
  @IsString()
  sessionId: string;
}
