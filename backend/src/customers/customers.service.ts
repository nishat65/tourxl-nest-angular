import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customers: Repository<Customers>,
  ) {}

  async findAll(): Promise<Customers[]> {
    return await this.customers.find({
      // select: ['id', 'firstName', 'lastName', 'phone', 'email'],
    });
  }

  async create(body) {
    const newRes = this.customers.create(body);
    return await this.customers.save(newRes);
  }

  async findCustomerByEmail(email: string) {
    return await this.customers.findOne({ where: { email } });
  }
}
