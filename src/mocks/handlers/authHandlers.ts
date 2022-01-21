import { rest } from 'msw';

export const authHandlers = [
  rest.get(
    'http://localhost:3000/api/user/sign-up/verification/ssafy',
    async (request, response, context) => {
      const status: number = 500;

      console.log(`[CREATE | /api/user/sign-up], ${JSON.stringify(request)}`);
      //return response(context.status(404, 'Custom status text'));
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
];
