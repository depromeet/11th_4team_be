import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PhoneNumberDto } from 'src/apis/user/dto/user.dto';
import { LOGIN_ERROR_CODE } from 'src/common/consts/enum';
import { errorBody } from 'src/common/funcs/error.func';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: PhoneNumberDto) {
    // 해당하는 계정이 있는지
    const user = await this.userRepository.findOneByPhoneNumber(data);
    if (!user) {
      throw new UnauthorizedException('이메일 확인바람');
    }
    // 패스워드 일치하는지
    // const isPasswordValidated: boolean = await bcrypt.compare(
    //   password,
    //   cat.password,
    // );

    //   if (!isPasswordValidated) {
    //     throw new UnauthorizedException('비밀번호 확인 바람');
    //   }

    //   console.log(cat, isPasswordValidated);
    //   const payload = { email: email, sub: cat.id };

    //   return {
    //     token: this.jwtService.sign(payload),
    //   };
  }
}
