import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/entities/user.entity';
import { AuthPayload } from 'src/model/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: AuthPayload){
    const { username } = payload;
    const user = this.userRepository.find({where: {username}});
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}