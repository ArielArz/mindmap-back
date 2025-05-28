import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationBaseDto } from 'src/common/dtos/pagination-base.dto';
import { UserRole } from '../entities/enum/user-role.enum';

export class PaginationAndFilterDto extends PaginationBaseDto {
  @ApiPropertyOptional({
    enum: UserRole,
    description: 'Filtrar por rol de usuario',
  })
  @IsOptional()
  @IsIn(Object.values(UserRole))
  role?: UserRole;

  @ApiPropertyOptional({
    enum: ['name', 'role'],
    description: 'Campos permitidos para ordenamiento',
  })
  @IsOptional()
  @IsIn(['name', 'role'])
  override sortBy?: 'name' | 'role' = 'name';
}
