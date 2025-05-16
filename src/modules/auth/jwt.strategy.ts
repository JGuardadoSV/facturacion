import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu_secreto_jwt',
    });
  }

  async validate(payload: any) {
    console.log('Payload del token:', payload);
    return {
      id: payload.sub,
      email: payload.email,
      rol: payload.rol,
      empresaid: payload.empresaid,
    };
  }
}
