import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { GuidesService } from './guides.service';
import { GuidesValidationPipe } from './guides.pipe';
import { CreateGuideDto, createGuideSchema } from './dtos/create-guide.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomersInterceptor } from 'src/customers/customers.interceptor';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}
  @Get()
  getAll() {
    return this.guidesService.findAll();
  }

  @Post()
  @UseInterceptors(CustomersInterceptor)
  @UsePipes(new GuidesValidationPipe(createGuideSchema))
  create(@Body() body: CreateGuideDto) {
    return this.guidesService.create(body);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async findOne(@Req() req: any) {
    const user = await this.guidesService.findOne(req.user.email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
