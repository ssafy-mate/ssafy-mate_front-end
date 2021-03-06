import { rest } from 'msw';

import {
  CodeConfirmForNewPassword,
  NewPassword,
} from '../../types/accountTypes';
import { EmailVerificationCodes, SsafyStudentDataList } from '../database/auth';
import { SsafyMateMemberList } from '../database/signIn';

export const newPasswordHandlers = [
  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/users/password/new`,
    async (request, response, context) => {
      const userEmail = request.url.searchParams.get('userEmail');

      const emailIndex = SsafyStudentDataList.findIndex(
        (ssafyStudent) => ssafyStudent.userEmail === userEmail,
      );

      // 교육생 정보가 없는 경우
      if (emailIndex === -1 && userEmail !== 'servererror@gmail.com') {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message:
              '가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.',
          }),
        );
      }

      // 서버 에러
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

  rest.post(
    `${process.env.REACT_APP_SERVER_URL}/api/users/password/new`,
    async (request: any, response, context) => {
      const data: CodeConfirmForNewPassword = request.body;
      const { code, userEmail } = data;

      const CodeIndex = EmailVerificationCodes.findIndex(
        (verificationCode) =>
          verificationCode.code === code &&
          verificationCode.userEmail === userEmail,
      );

      if (CodeIndex === -1 && code !== '55555555' && code !== '33333333') {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '올바른 인증 코드가 아닙니다.',
          }),
        );
      }

      if (code === '33333333') {
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
          message: '인증이 완료되었습니다.',
        }),
      );
    },
  ),

  rest.put(
    `${process.env.REACT_APP_SERVER_URL}/api/users/password/new`,
    async (request: any, response, context) => {
      const data: NewPassword = request.body;
      const { password, userEmail } = data;

      const studentIndex = SsafyMateMemberList.findIndex(
        (ssafyStudent) => ssafyStudent.userData.userEmail === userEmail,
      );

      if (studentIndex !== -1 && password !== 'errrrrror') {
        SsafyMateMemberList[studentIndex].userData.password = password;
      }

      if (password === 'errrrrror') {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 비밀번호 재설정 실패',
          }),
        );
      }

      return response(
        context.json({
          success: true,
          message: '비밀번호 재설정이 완료되었습니다.',
        }),
      );
    },
  ),
];
