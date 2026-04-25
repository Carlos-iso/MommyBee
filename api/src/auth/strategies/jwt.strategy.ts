import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MommyRepository } from '../../modules/mommy/mommy.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private mommyRepo: MommyRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mommybee-secret-key-dev',
    });
  }

  async validate(payload: any) {
    const mommy = await this.mommyRepo.findById(payload.sub);
    if (!mommy) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email };
  }
}
