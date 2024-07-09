import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const encryptedPassword = bcrypt.hashSync(
      request.body.password,
      bcrypt.genSaltSync(+process.env.PWD_SALT),
    );
    const newResponse = {
      ...request.body,
      password: encryptedPassword,
    };
    request.body = newResponse;
    return next.handle().pipe(
      map((data) => {
        const { password, ...response } = data;
        return response;
      }),
    );
  }
}
