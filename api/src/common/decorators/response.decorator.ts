import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';

export function ResponseSignUp() {
  return applyDecorators(
    ApiCreatedResponse({
      description: '회원가입성공',
    }),
    ApiConflictResponse({
      description: '가입된 회원',
    }),
  );
}
