import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesValidationPipe } from './guides.pipe';
import { CreateGuideDto, createGuideSchema } from './dtos/create-guide.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomersInterceptor } from 'src/customers/customers.interceptor';

@Controller('guides')
// @UseGuards(AuthGuard)
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
}
