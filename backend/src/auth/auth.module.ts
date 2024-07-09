import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guides } from 'src/guides/guides.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guides])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
