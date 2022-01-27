import { rest } from 'msw';

import { teamDataList } from '../database/team';

export const teamHandlers = [
  rest.post(
    'http://localhost:3000/api/auth/team',
    async (request, response, context) => {
      const status: number = 200;

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
        default:
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
  rest.get(
    'http://localhost:3000/api/auth/team/:teamId',
    async (request, response, context) => {
      const { teamId } = request.params;
      const teamIndex = teamDataList.findIndex(
        (team) => team.teamData.teamId === Number(teamId),
      );
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

      // 해당 팀 정보가 없을 시
      if (teamIndex === -1) {
        return response(
          context.status(404),
          context.json({
            status: 404,
            success: false,
            message: '해당 팀 정보가 존재하지 않습니다.',
          }),
        );
      }

      // 팀 상세 정보 조회 성공 시
      return response(context.json(teamDataList[teamIndex]));
    },
  ),
];
