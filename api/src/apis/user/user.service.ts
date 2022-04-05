import { ObjectId } from 'mongoose';
import { UserRepository } from 'src/repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PhoneNumberDto, UpdateProfileDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async checkDuplicatePhoneNumber(phoneNumber: PhoneNumberDto) {
    const user = await this.userRepository.findOneByPhoneNumber(phoneNumber);
    return user ? true : false;
  }

  async signUp(data: PhoneNumberDto): Promise<any> {
    const user = await this.userRepository.findOneByPhoneNumber(data);
    if (user) {
      throw new UnauthorizedException('가입된 유저입니다');
    } else {
      return await this.userRepository.create(data);
    }
  }

  async updateProfile(userId: string, data: UpdateProfileDto): Promise<any> {
    const { nickname } = data;
    const isNicknameExist = await this.userRepository.existByNickName(nickname);

    if (isNicknameExist) {
      throw new UnauthorizedException('해당하는 닉네임 이미 존재');
    } else {
      return await this.userRepository.updateProfile(data);
    }
  }
}
