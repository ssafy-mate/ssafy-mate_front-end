import { rest } from 'msw';

export const teamHandlers = [
  rest.post(
    'http://localhost:3000/api/auth/team',
    async (request, response, context) => {
      const status: number = 500;

      console.log(`[CREATE | /api/auth/team], ${JSON.stringify(request)}`);

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
              message: 'Internal Server, 팀 생성 실패',
            }),
          );
      }
    },
  ),
];
