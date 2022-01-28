import { rest } from 'msw';
import { LogInRequestType } from '../../types/signInTypes';

export const signInHandlers = [
  rest.post(
    'http://localhost:3000/api/user/sign-in',
    async (request: any, response, context) => {
      let data: LogInRequestType;
      data = request.body;

      if (data.userEmail === 'no@gmail.com') {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '아이디 또는 비밀번호가 잘못 입력되었습니다.',
          }),
        );
      }

      return response(
        context.json({
          token: 'ad123sdafgfa0asdfas12390',
          message: '로그인하였습니다.',
        }),
      );
    },
  ),
];
