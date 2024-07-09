import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Guides } from 'src/guides/guides.entity';
import { Customers } from 'src/customers/customers.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Guides) private readonly guides: Repository<Guides>,
    @InjectRepository(Customers)
    private readonly customers: Repository<Customers>,
  ) {}

  async signGuideIn(body) {
    const user = await this.guides.findOne({
      where: { email: body.email },
      select: [
        'email',
        'firstName',
        'lastName',
        'officeAddress',
        'phone',
        'password',
      ],
    });
    if (!user) throw new NotFoundException('User not found');
    const comparePassword = await bcrypt.compare(body.password, user.password);
    if (!comparePassword) throw new BadRequestException('Invalid credentials');
    const { password, ...restUserProp } = user;
    return restUserProp;
  }

  async signCustomerIn(body) {
    const customer = await this.customers.findOne({
      where: { email: body.email },
      select: [
        'email',
        'firstName',
        'lastName',
        'phone',
        'address',
        'password',
      ],
    });
    if (!customer) throw new NotFoundException('User not found');
    const comparePassword = await bcrypt.compare(
      body.password,
      customer.password,
    );
    if (!comparePassword) throw new BadRequestException('Invalid credentials');
    const { password, ...restUserProp } = customer;
    return restUserProp;
  }
}
