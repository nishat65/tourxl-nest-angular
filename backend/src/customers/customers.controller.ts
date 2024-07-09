import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  createCustomerSchema,
} from './dtos/create-user.dto';
import { CustomerValidationPipe } from './customers.pipe';
import { CustomersInterceptor } from './customers.interceptor';
import { Response } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get()
  async findAll(@Res() res: Response) {
    return res.status(200).json({
      message: 'success',
      data: {
        customers: await this.customersService.findAll(),
      },
    });
  }

  @Post()
  @UseInterceptors(CustomersInterceptor)
  @UsePipes(new CustomerValidationPipe(createCustomerSchema))
  create(@Body() body: CreateCustomerDto) {
    return this.customersService.create(body);
  }
}
