import { alreadyMember, nonSsafy, authError } from './../database/auth';

import { rest } from 'msw';

import {
  EmailVerificationCodeConfirmRequest,
  EmailVerificationCodeRequest,
  SignUpProfile,
} from '../../types/userInfomationTypes';

export const authHandlers = [
  // 회원 가입 1단계 교육생 인증
  rest.get(
    'http://localhost:3000/api/user/sign-up/verification/ssafy',
    async (request, response, context) => {
      const userName = request.url.searchParams.get('userName');

      // 교육생 정보가 없는 경우(이름 : 비싸피)
      if (userName === nonSsafy.userName) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '해당 교육생 정보가 없습니다.',
          }),
        );
      }

      // 이미 가입된 교육생(이름 : 싸피인)
      if (userName === alreadyMember.userName) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '이미 가입된 교육생입니다.',
          }),
        );
      }

      // 싸피 교육생이 맞는 경우(이름 : 서버오류)
      if (userName === authError.userName) {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 교육생 인증 실패',
          }),
        );
      }

      return response(
        context.json({
          success: true,
          message: '교육생 인증이 완료되었습니다.',
        }),
      );
    },
  ),
  // 회원가입 2단계-1 이메일 인증 코드 전송
  rest.get(
    'http://localhost:3000/api/user/sign-up/verification/email',
    async (request, response, context) => {
      let userEmail = request.url.searchParams.get('userEmail');

      if (userEmail === 'already@gmail.com') {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '이미 등록된 이메일입니다.',
          }),
        );
      }

      if (userEmail === 'servererror@gmail.com') {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 이메일 전송 실패',
          }),
        );
      }

      return response(
        context.json({
          success: true,
          message:
            '입력한 이메일로 인증 메일을 발송했습니다.\n 이메일에 표시된 인증코드를 입력해주세요.',
        }),
      );
    },
  ),
  // 회원가입 2단계-2 이메일 인증 코드 확인
  rest.put(
    'http://localhost:3000/api/user/sign-up/verification/email',
    async (request: any, response, context) => {
      let data: EmailVerificationCodeConfirmRequest = {
        code: '',
        userEmail: '',
      };
      data = request.body;

      if (data.code === '00000000') {
        return response(
          context.status(400),
          context.json({
            status: 400,
            success: false,
            message: '올바른 인증 코드가 아닙니다.',
          }),
        );
      }

      if (data.code === '44444444') {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '인증코드가 만료되었습니다.',
          }),
        );
      }

      if (data.code === '55555555') {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 인증 코드 확인 실패',
          }),
        );
      }

      return response(
        context.json({
          success: true,
        }),
      );
    },
  ),

  // 회원가입 3단계
  rest.post(
    'http://localhost:3000/api/user',
    async (request: any, response, context) => {
      let data: SignUpProfile;
      data = request.body;

      if (data.selfIntroduction === '실패') {
        return response(
          context.status(400),
          context.json({
            status: 400,
            success: false,
            message: '계정 생성이 실패하였습니다.',
          }),
        );
      }
      if (data.selfIntroduction === '서버실패') {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 계정 생성 실패',
          }),
        );
      }
      return response(
        context.json({
          message: '계정 생성이 완료되었습니다.',
        }),
      );
    },
  ),
];
