import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelpPoint } from './entities/helppoint.entity';
import { CreateHelppointDto } from './dto/create-helppoint.dto';
import { UpdateHelppointDto } from './dto/update-helppoint.dto';

@Injectable()
export class HelppointsService {
  constructor(
    @InjectRepository(HelpPoint)
    private readonly helpPointRepo: Repository<HelpPoint>,
  ) {}

  create(createDto: CreateHelppointDto) {
    const helppoint = this.helpPointRepo.create(createDto);
    return this.helpPointRepo.save(helppoint);
  }

  findAll() {
    return this.helpPointRepo.find();
  }

  async findOne(id: string) {
    const helppoint = await this.helpPointRepo.findOneBy({ id });
    if (!helppoint) throw new NotFoundException('Helppoint not found');
    return helppoint;
  }

  async update(id: string, updateDto: UpdateHelppointDto) {
    const helppoint = await this.findOne(id);
    Object.assign(helppoint, updateDto);
    return this.helpPointRepo.save(helppoint);
  }

  async remove(id: string) {
    const helppoint = await this.findOne(id);
    return this.helpPointRepo.remove(helppoint);
  }

  async findByCategory(category: string) {
    return this.helpPointRepo.find({
      where: { category },
    });
  }

  async findNearby(lat: number, lng: number, radius: number = 10000) {
    return this.helpPointRepo
      .createQueryBuilder('helppoint')
      .where(
        `ST_DWithin(
          helppoint.coordinates,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
          :radius
        )`,
        { lat, lng, radius },
      )
      .getMany();
  }

  async countAll(){
    return this.helpPointRepo.count();
  }

  async countLastWeek(){
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.helpPointRepo
      .createQueryBuilder('helppoint')
      .where('helppoint.createdAt >= :date', { date: oneWeekAgo.toISOString() })
      .getCount();
  }
}
