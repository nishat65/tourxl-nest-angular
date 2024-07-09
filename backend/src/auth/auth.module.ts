import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guides } from 'src/guides/guides.entity';
import { Customers } from 'src/customers/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guides, Customers])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
