import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Point } from 'geojson';

export class CreateHelppointDto {
  @ApiProperty({ example: 'Espacio Armonia.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Centro comunitario que ofrece clases de yoga, meditacion y talleres de bienestar emocional para todas las edades.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '+54 911 2345-6789' })
  @IsString()
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ example: 'Bienestar' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Calle Tranquila 456' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Córdoba' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Argentina' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: {
      type: 'Point',
      coordinates: [-64.1888, -31.4201]
    },
    description: 'Coordenadas geograficas en formato GeoJSON Point'
  })
  @IsNotEmpty()
  coordinates: Point;
}
