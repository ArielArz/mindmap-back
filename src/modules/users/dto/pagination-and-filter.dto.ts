import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationBaseDto } from 'src/common/dtos/pagination-base.dto';
import { UserRole } from '../entities/enum/user-role.enum';
import { UserStatus } from '../entities/enum/user-status.enum';

export class PaginationAndFilterDto extends PaginationBaseDto {
  @ApiPropertyOptional({
    enum: UserRole,
    description: 'Filtrar por rol de usuario',
  })
  @IsOptional()
  @IsIn(Object.values(UserRole))
  role?: UserRole;

  @ApiPropertyOptional({
    enum: UserStatus,
    description: 'Filtrar por estado del usuario',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    enum: ['name', 'role'],
    description: 'Campos permitidos para ordenamiento',
  })
  @IsOptional()
  @IsIn(['name', 'role'])
  override sortBy?: 'name' | 'role' = 'name';
}
