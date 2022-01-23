import { rest } from 'msw';

export const authHandlers = [
  //회원 가입 1단계 교육생 인증
  rest.get(
    'http://localhost:3000/api/user/sign-up/verification/ssafy',
    async (request, response, context) => {
      const status: number = 200;

      console.log(
        `[GET | /api/user/sign-up/verification/ssafy], ${JSON.stringify(
          request,
        )}`,
      );

      switch (status) {
        case 200:
          return response(
            context.json({
              status: 200,
              success: true,
              message: '',
            }),
          );

        case 500:
          return response(
            context.json({
              status: 500,
              success: false,
              message: '',
            }),
          );
      }
    },
  ),

  //회원가입 2단계 이메일 인증 코드 전송
  rest.post(
    'http://localhost:3000/api/user/sign-up/verification/email',
    async (request, response, context) => {
      const status: number = 200;

      console.log(
        `[POST | /api/user/sign-up/verification/email], ${JSON.stringify(
          request,
        )}`,
      );

      switch (status) {
        case 200:
          return response(
            context.json({
              status: 200,
              success: true,
              message: '',
            }),
          );
        case 401:
          return response(
            context.json({
              status: 401,
              success: false,
              message: '이미 등록된 이메일입니다.',
            }),
          );
        case 500:
          return response(
            context.json({
              status: 500,
              success: false,
              message: 'Internal Server Error, 이메일 전송 실패',
            }),
          );
      }
    },
  ),
  rest.put(
    'http://localhost:3000/api/user/sign-up/verification/email',
    async (request, response, context) => {
      const status: number = 403;

      console.log(
        `[PUT | /api/user/sign-up/verification/email], ${JSON.stringify(
          request,
        )}`,
      );

      switch (status) {
        case 200:
          return response(
            context.json({
              status: 200,
              success: true,
              message: '',
            }),
          );
        case 400:
          return response(
            context.json({
              status: 401,
              success: false,
              message: '올바른 인증 코드가 아닙니다.',
            }),
          );
        case 403:
          return response(
            context.json({
              status: 403,
              success: false,
              message: '입력 유효 시간이 초과되었습니다.',
            }),
          );
      }
    },
  ),
  rest.post(
    'http://localhost:3000/api/user',
    async (request, response, context) => {
      const status: number = 200;

      console.log(
        `[POST | /api/user/sign-up/verification/email], ${JSON.stringify(
          request,
        )}`,
      );

      switch (status) {
        case 200:
          return response(
            context.json({
              status: 200,
              success: true,
              message: '',
            }),
          );
        case 500:
          return response(
            context.json({
              status: 403,
              success: false,
              message: 'Internal Server Error, 계정 생성 실패',
            }),
          );
      }
    },
  ),
];
