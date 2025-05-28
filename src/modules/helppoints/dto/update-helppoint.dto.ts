import { PartialType } from '@nestjs/mapped-types';
import { CreateHelppointDto } from './create-helppoint.dto';

export class UpdateHelppointDto extends PartialType(CreateHelppointDto) {}
