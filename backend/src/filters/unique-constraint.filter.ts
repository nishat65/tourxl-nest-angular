import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class UniqueConstraintViolationFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if ((exception as any).driverError.code === '23505') {
      return response.status(400).json({
        error: 'Bad Request',
        statusCode: 400,
        message: (exception as any).driverError.detail,
      });
    }
    return response.status(500).json({
      statusCode: 500,
      error: 'Internal server error',
      message: 'Something went wrong',
    });
  }
}
