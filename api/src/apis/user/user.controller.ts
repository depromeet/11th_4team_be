import { User } from 'src/models/user.model';
import { AuthenticationService } from './../authentication/authentication.service';
import { Body, Controller, Post, Param, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ResponseSignUp } from 'src/common/decorators/response.decorator';
import { UserService } from './user.service';
import { PhoneNumberDto, UpdateProfileDto } from './dto/user.dto';
import { ObjectId } from 'mongoose';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '휴대폰 번호 중복여부' })
  @Post('phoneNumber/duplicate')
  async checkDuplicatePhoneNumber(
    @Body() data: PhoneNumberDto,
  ): Promise<boolean> {
    return await this.userService.checkDuplicatePhoneNumber(data);
  }

  @ApiOperation({ summary: '유저 가입' })
  @ResponseSignUp()
  @ApiBody({ type: PhoneNumberDto, description: '나중에 payload의 id로 대체' })
  @Post('signUp/:inputNumber')
  async signUp(
    @Body() data: PhoneNumberDto,
    @Param('inputNumber') inputNumber: string,
  ): Promise<User> {
    const isAuthPass = await this.authenticationService.certificationMobile(
      inputNumber,
    );
    if (isAuthPass) {
      return await this.userService.signUp(data);
    }
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signIn')
  login(@Body() data: PhoneNumberDto) {
    return this.authService.signUp(data);
  }

  @ApiOperation({ summary: '유저 정보 입력' })
  @ResponseSignUp()
  @ApiBody({ type: UpdateProfileDto })
  @Put('profile/:userId')
  async updateProfile(
    @Body() updateProfileData: UpdateProfileDto,
    @Param('userId') userId: string,
  ): Promise<any> {
    return await this.userService.updateProfile(userId, updateProfileData);
  }
}
