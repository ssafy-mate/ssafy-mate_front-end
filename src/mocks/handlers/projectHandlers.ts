import { rest } from 'msw';

import { TeamListData } from '../database/team';

export const projectHandlers = [
  rest.get(
    'http://localhost:3000/api/auth/project/team-list',
    async (request, response, context) => {
      const token = request.headers['_headers'].authorization.split(' ')[1];

      // 토큰이 유효하지 않을 시
      if (token !== 't123456789') {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '토큰이 유효하지 않습니다.',
          }),
        );
      }

      // 팀 리스트 조회 성공 시
      return response(context.json(TeamListData));
    },
  ),
];
