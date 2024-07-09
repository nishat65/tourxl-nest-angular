import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guides } from './guides.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guides) private readonly guides: Repository<Guides>,
  ) {}

  findAll(): Promise<Guides[]> {
    return this.guides.find();
  }

  create(body) {
    return this.guides.save(body);
  }
}
