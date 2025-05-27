import { Module } from '@nestjs/common';
import { HelppointsService } from './helppoints.service';
import { HelppointsController } from './helppoints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpPoint } from './entities/helppoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelpPoint])],
  controllers: [HelppointsController],
  providers: [HelppointsService],
})
export class HelppointsModule {}
