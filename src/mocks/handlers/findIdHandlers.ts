import { rest } from 'msw';

export const findIdHandlers = [
  rest.get(
    'http://localhost:3000/api/user/id-search',
    async (request, response, context) => {
      const userEmail = request.url.searchParams.get('userEmail');

      // 교육생 정보가 없는 경우
      if (userEmail === 'sugarfina637@naver.comm') {
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
            message: 'Internal Server Error, 아이디 찾기 실패',
          }),
        );
      }

      // 아이디 조회 성공 시
      return response(
        context.json({
          success: true,
          userEmail: 'sugarfina637@naver.com',
          message:
            '입력한 이메일로 인증 메일을 발송했습니다.\n 이메일에 표시된 인증코드를 입력해주세요.',
        }),
      );
    },
  ),
];
