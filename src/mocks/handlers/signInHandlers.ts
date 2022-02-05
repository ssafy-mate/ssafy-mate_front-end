import { rest } from 'msw';
import { SignInRequestType } from '../../types/authTypes';
import { SsafyMateMemberList } from '../database/signIn';

export const signInHandlers = [
  rest.post(
    'http://i6a402.p.ssafy.io:8081/api/user/sign-in',
    async (request: any, response, context) => {
      const data: SignInRequestType = request.body;
      const { userEmail } = data;

      const memberIndex = SsafyMateMemberList.findIndex(
        (ssafyMember) => ssafyMember.userData.userEmail === userEmail,
      );

      if (memberIndex === -1) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '아이디 또는 비밀번호가 잘못 입력되었습니다.',
          }),
        );
      }

      return response(context.json(SsafyMateMemberList[memberIndex].userData));
    },
  ),

  rest.delete(
    'http://i6a402.p.ssafy.io:8081/',
    async (request, response, context) => {},
  ),
];
