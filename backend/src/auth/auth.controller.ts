import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthPipe } from './auth.pipe';
import { authDto, authSchema } from './dtos/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @UsePipes(new AuthPipe(authSchema))
  async signIn(@Body() body: authDto, @Res() res: Response) {
    const user = await this.authService.signIn(body.email);
    if (!user) throw new NotFoundException('User not found');
    const token = await this.jwtService.signAsync(
      { email: user.email },
      { secret: process.env.JWT_SECRET },
    );
    const { email, firstName, lastName, phone, officeAddress } = user;
    return res.status(200).json({
      token,
      userDetails: { email, firstName, lastName, phone, officeAddress },
      statusCode: 200,
      message: 'Logged in',
    });
  }
}
