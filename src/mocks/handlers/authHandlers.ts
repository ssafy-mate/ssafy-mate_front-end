import { rest } from 'msw';

import {
  EmailVerificationCodes,
  SsafyStudentDataList,
} from './../database/auth';

import {
  EmailVerificationCodeConfirmRequest,
  SignUpProfile,
} from '../../types/signUpTypes';

interface Student {
  id: number | null;
  campus: string;
  studentName: string;
  studentNumber: string;
  userEmail: string | null;
}

export const authHandlers = [
  // 회원 가입 1단계 교육생 인증
  rest.get(
    'http://i6a402.p.ssafy.io:8081/api/users/sign-up/verification/ssafy',
    async (request, response, context) => {
      const studentNumber = request.url.searchParams.get('studentNumber');
      const studentName = request.url.searchParams.get('studentNumber');
      let student: Student = {
        id: -1,
        campus: '',
        studentName: '',
        studentNumber: '',
        userEmail: null,
      };

      SsafyStudentDataList.forEach((ssafyStudent) => {
        if (ssafyStudent.studentNumber === studentNumber) {
          student = ssafyStudent;
        }
      });

      // 교육생 정보가 없는 경우
      if (student.id === -1) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '해당 교육생 정보가 없습니다.',
          }),
        );
      }

      // 이미 가입된 교육생
      if (student.userEmail !== null) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '이미 가입된 교육생입니다.',
          }),
        );
      }

      // 서버 오류
      if (studentName === '서버오류') {
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
    'http://i6a402.p.ssafy.io:8081/api/users/sign-up/verification/emails',
    async (request, response, context) => {
      const userEmail = request.url.searchParams.get('userEmail');

      const emailIndex = SsafyStudentDataList.findIndex(
        (ssafyStudent) => ssafyStudent.userEmail === userEmail,
      );

      if (emailIndex !== -1) {
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
    'http://i6a402.p.ssafy.io:8081/api/users/sign-up/verification/emails',
    async (request: any, response, context) => {
      const data: EmailVerificationCodeConfirmRequest = request.body;
      const { code, userEmail } = data;
      const CodeIndex = EmailVerificationCodes.findIndex(
        (verificationCode) =>
          verificationCode.code === code &&
          verificationCode.userEmail === userEmail,
      );

      if (CodeIndex === -1 && code !== '55555555') {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '올바른 인증 코드가 아닙니다.',
          }),
        );
      }
      if (
        CodeIndex >= 0 &&
        EmailVerificationCodes[CodeIndex].timeout &&
        code !== '55555555'
      ) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '인증코드가 만료되었습니다.',
          }),
        );
      }
      if (code === '55555555') {
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
    'http://i6a402.p.ssafy.io:8081/api/users',
    async (request: any, response, context) => {
      const data: SignUpProfile = request.body;
      const { selfIntroduction } = data;

      if (selfIntroduction === '실패') {
        return response(
          context.status(400),
          context.json({
            status: 400,
            success: false,
            message: '계정 생성이 실패하였습니다.',
          }),
        );
      }
      if (selfIntroduction === '서버실패') {
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
