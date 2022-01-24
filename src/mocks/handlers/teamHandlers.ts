import { rest } from 'msw';

export const teamHandlers = [
  rest.post(
    'http://localhost:3000/api/auth/team',
    async (request, response, context) => {
      const status: number = 200;

      console.log(`[CREATE | /api/auth/team], ${JSON.stringify(request.body)}`);

      switch (status) {
        case 500:
          return response(
            context.json({
              status: 500,
              success: false,
              message: 'Internal Server, 팀 생성 실패',
            }),
          );
        default:
          return response(
            context.json({
              status: 200,
              success: true,
              message: '',
            }),
          );
      }
    },
  ),
];
