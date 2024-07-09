import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
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

  @Post('login/guide')
  @UsePipes(new AuthPipe(authSchema))
  async signGuideIn(@Body() body: authDto, @Res() res: Response) {
    const user = await this.authService.signGuideIn(body);
    const token = await this.jwtService.signAsync(
      { email: user.email },
      { secret: process.env.JWT_SECRET },
    );
    return res.status(200).json({
      token,
      data: {
        user,
      },
      statusCode: 200,
      message: 'success',
    });
  }

  @Post('login/customer')
  @UsePipes(new AuthPipe(authSchema))
  async signCustomerIn(@Body() body: authDto, @Res() res: Response) {
    const customer = await this.authService.signCustomerIn(body);
    const token = await this.jwtService.signAsync(
      { email: customer.email },
      { secret: process.env.JWT_SECRET },
    );
    return res.status(200).json({
      token,
      data: {
        customer,
      },
      statusCode: 200,
      message: 'success',
    });
  }
}
