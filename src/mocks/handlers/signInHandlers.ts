import { rest } from 'msw';
import { SignInRequestType } from '../../types/signInTypes';

export const signInHandlers = [
  rest.post(
    'http://localhost:3000/api/user/sign-in',
    async (request: any, response, context) => {
      let data: SignInRequestType;
      data = request.body;

      if (data.userEmail === 'nobody@gmail.com') {
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
          userId: 1,
          userName: '박정환',
          userEmail: 'jeonghwan.dev@gmail.com',
          studentNumber: '0645387',
          campus: '서울',
          ssafyTrack: 'Java Track',
          token: 'ad123sdafgfa0asdfas12390',
          projects: [
            {
              projectId: 1,
              projectName: '공통 프로젝트',
              projectTrack: '웹 기술',
            },
            {
              projectId: 2,
              projectName: '특화 프로젝트',
              projectTrack: null,
            },
            {
              projectId: 3,
              projectName: '자율 프로젝트',
            },
          ],
          message: '로그인하였습니다.',
        }),
      );
    },
  ),

  rest.delete(
    'http://localhost:3000/',
    async (request, response, context) => {},
  ),
];
