import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreateResourceDto)
export class UpdateResourceDto extends PartialType(CreateResourceDto) { }
