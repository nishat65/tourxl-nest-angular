import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customers.entity';
import { CustomersInterceptor } from './customers.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersService, CustomersInterceptor],
  controllers: [CustomersController],
})
export class CustomersModule {}
