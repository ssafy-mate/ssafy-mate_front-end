import { rest } from 'msw';

import { teamDataList } from '../database/team';

export const teamHandlers = [
  rest.post(
    'https://i6a402.p.ssafy.io:8443/api/auth/team',
    async (request, response, context) => {
      const token: string | null =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '토큰이 유효하지 않습니다.',
          }),
        );
      }

      if (status === 500) {
        return response(
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server, 팀 생성 실패',
          }),
        );
      }

      return response(
        context.json({
          teamId: 1,
          message: '팀을 성공적으로 생성하였습니다.',
        }),
      );
    },
  ),

  rest.get(
    'https://i6a402.p.ssafy.io:8443/api/auth/team/info/:teamId',
    async (request, response, context) => {
      const { teamId } = request.params;
      const teamIndex = teamDataList.findIndex(
        (team) => team.teamData.teamId === Number(teamId),
      );
      const token = request.headers['_headers'].authorization.split(' ')[1];

      // 토큰이 유효하지 않을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
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

  rest.post(
    'https://i6a402.p.ssafy.io:8443/api/auth/team/request',
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
            message: '토큰이 유효하지 않습니다.',
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
];
