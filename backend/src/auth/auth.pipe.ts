import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class AuthPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = [...new Set(error.issues.map((issue) => issue.message))];
        throw new BadRequestException(issues);
      }
      throw new InternalServerErrorException();
    }
  }
}
