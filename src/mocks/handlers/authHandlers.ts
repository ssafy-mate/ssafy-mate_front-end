import { rest } from 'msw';

export const authHandlers = [
  //회원 가입 1단계 교육생 인증
  rest.get(
    'http://localhost:3000/api/user/sign-up/verification/ssafy',
    async (request, response, context) => {
      const status: number = 401;

      console.log(
        `[GET | /api/user/sign-up/verification/ssafy], ${JSON.stringify(
          request,
        )}`,
      );

      switch (status) {
        case 200:
          return response(
            context.json({
              success: true,
              message: '교육생 인증이 완료되었습니다.',
            }),
          );
        case 401:
          return response(
            context.json({
              status: 401,
              success: false,
              message: '해당 교육생 정보가 없습니다.',
            }),
          );
        case 409:
          return response(
            context.json({
              status: 409,
              success: false,
              message: '이미 가입된 교육생입니다.',
            }),
          );
        case 500:
          return response(
            context.json({
              status: 500,
              success: false,
              message: 'Internal Server Error, 교육생 인증 실패',
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
              success: true,
              message:
                '입력한 이메일로 인증 메일을 발송했습니다.\n 이메일에 표시된 인증코드를 입력해주세요.',
            }),
          );
        case 409:
          return response(
            context.json({
              status: 409,
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
      const status: number = 200;

      console.log(
        `[PUT | /api/user/sign-up/verification/email], ${JSON.stringify(
          request,
        )}`,
      );

      switch (status) {
        case 200:
          return response(
            context.json({
              success: true,
            }),
          );
        case 400:
          return response(
            context.json({
              status: 400,
              success: false,
              message: '올바른 인증 코드가 아닙니다.',
            }),
          );
        case 403:
          return response(
            context.json({
              status: 403,
              success: false,
              message: '인증코드가 만료되었습니다.',
            }),
          );
        case 500:
          return response(
            context.json({
              status: 500,
              success: false,
              message: 'Internal Server Error, 인증 코드 확인 실패',
            }),
          );
      }
    },
  ),

  //회원가입 3단계
  rest.post(
    'http://localhost:3000/api/user',
    async (request, response, context) => {
      const status: number = 200;

      console.log(`[POST | /api/user], ${JSON.stringify(request)}`);

      switch (status) {
        case 200:
          return response(
            context.json({
              message: '계정 생성이 완료되었습니다.',
            }),
          );
        case 400:
          return response(
            context.json({
              status: 400,
              success: false,
              message: '계정 생성이 실패하였습니다.',
            }),
          );
        case 500:
          return response(
            context.json({
              status: 500,
              success: false,
              message: 'Internal Server Error, 계정 생성 실패',
            }),
          );
      }
    },
  ),
];
