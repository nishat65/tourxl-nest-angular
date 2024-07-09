import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Guides } from 'src/guides/guides.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Guides) private readonly guide: Repository<Guides>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) throw new UnauthorizedException();
    const token = request.headers.authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const findUser = await this.guide.findOne({
        where: { email: user.email },
      });
      if (!findUser)
        throw new UnauthorizedException({
          message: 'User not found',
          error: 'Not found',
          status: 401,
        });
      request['user'] = findUser.email;
    } catch (error) {
      if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException(error.message);
      if (error.status === 401)
        throw new HttpException(error.message, error.error, error.status);
      throw new InternalServerErrorException('Something went wrong!');
    }
    return true;
  }
}
