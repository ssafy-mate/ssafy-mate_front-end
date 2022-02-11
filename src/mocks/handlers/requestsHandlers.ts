import { rest } from 'msw';

export const requestsHandlers = [
  rest.post(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/requests/users`,
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 로그인 안 되어 있을 시
      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '팀 지원 권한이 없습니다. 로그인 후 이용 가능합니다.',
          }),
        );
      }

      // 사용자가 이미 팀에 속해있을 시
      if (status === 409) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '사용자는 이미 팀에 속해있어 요청이 불가능합니다.',
          }),
        );
      }

      // 서버 오류 시
      if (status === 500) {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 팀 지원 요청 실패',
          }),
        );
      }

      // 팀 지원 성공 시
      return response(
        context.json({
          success: true,
          message: '해당 팀의 팀장 승인 후 팀 합류가 최종적으로 완료됩니다.',
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/requests/teams`,
    async (request, response, context) => {
      const token: string | null =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 토큰이 유효하지 않을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '팀 합류 요청을 보낼 수 있는 권한이 없습니다.',
          }),
        );
      }

      // 해당 교육생이 이미 팀에 속해있을 시
      if (status === 409) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '해당 교육생은 이미 다른 팀에 합류되어 있습니다.',
          }),
        );
      }

      // 서버 오류 시
      if (status === 500) {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 팀 합류 요청 실패',
          }),
        );
      }

      // 팀 합류 요청 성공 시
      return response(
        context.json({
          success: true,
          message: '해당 교육생의 승인 후 팀 합류가 최종적으로 완료됩니다.',
        }),
      );
    },
  ),

  rest.put(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/requests/responses`,
    async (request, response, context) => {
      const status: number = 200;

      if (status === 403) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '응답 권한이 없습니다.',
          }),
        );
      }

      if (status === 409) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '해당 교육생은 이미 다른 팀에 합류되어 있습니다.',
          }),
        );
      }

      if (status === 500) {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 제안 요청 응답 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '응답 완료',
        }),
      );
    },
  ),
];
