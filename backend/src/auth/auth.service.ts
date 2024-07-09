import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guides } from 'src/guides/guides.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Guides) private readonly guides: Repository<Guides>,
  ) {}

  async signIn(email: string) {
    try {
      const user = await this.guides.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
