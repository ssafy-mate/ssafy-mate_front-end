import { rest } from 'msw';

export const findIdHandlers = [
  rest.get(
    'https://i6a402.p.ssafy.io:8443/api/user/id-search',
    async (request, response, context) => {
      const userName = request.url.searchParams.get('userName');

      // 교육생 정보가 없는 경우
      if (userName === '이여진') {
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
      if (userName === '서버에러') {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 아이디 찾기 실패',
          }),
        );
      }

      // 아이디 조회 성공 시
      return response(
        context.json({
          success: true,
          userEmail: 'sugarfina637@naver.com',
          message: '계정을 찾았습니다.',
        }),
      );
    },
  ),
];
