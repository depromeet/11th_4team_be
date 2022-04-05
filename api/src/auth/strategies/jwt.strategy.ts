import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ACCOUNT_TYPE, TOKEN_ERROR_CODE } from 'src/common/consts/enum';
import { errorBody } from 'src/common/funcs/error.func';
import { JwtStrategyConfig } from '../jwt-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super(JwtStrategyConfig);
  }

  async validate(payload: any) {
    if (payload.accountType !== ACCOUNT_TYPE.USER) {
      throw new UnauthorizedException(
        errorBody(TOKEN_ERROR_CODE.NOT_ACCOUNT, '회원이 아닙니다.'),
      );
    }
    return {
      id: payload.id,
    };
  }
}
