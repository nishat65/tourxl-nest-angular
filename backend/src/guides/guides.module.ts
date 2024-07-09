import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { Guides } from './guides.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guides])],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
