import { rest } from 'msw';

import { userDataList } from '../database/user';

export const userHandlers = [
  rest.get(
    'http://localhost:3000/api/auth/user/info/:userId',
    async (request, response, context) => {
      const { userId } = request.params;
      const userIndex: number = userDataList.findIndex(
        (user) => user.userData.userId === Number(userId),
      );
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];

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

      // 해당 교육생 정보가 없을 시
      if (userIndex === -1) {
        return response(
          context.status(404),
          context.json({
            status: 404,
            success: false,
            message: '해당 교육생 정보가 존재하지 않습니다.',
          }),
        );
      }

      // 교육생 상세 정보 조회 성공 시
      return response(context.json(userDataList[userIndex]));
    },
  ),

  rest.post(
    'http://localhost:3000/api/auth/user/project/track',
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];

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

      // 프로젝트 트랙 선택 성공 시
      return response(
        context.json({
          success: true,
          message: '프로젝트 트랙 선택이 완료되었습니다.',
        }),
      );
    },
  ),

  rest.get(
    'http://localhost:3000/api/auth/user/projects',
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];

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

      // 사용자 프로젝트 정보 조회 성공 시
      return response(
        context.json({
          projects: [
            {
              projectId: 1,
              projectName: '공통 프로젝트',
              projectTrack: '웹 기술',
              projectTeamId: 1,
            },
            {
              projectId: 2,
              projectName: '특화 프로젝트',
              projectTrack: '빅데이터',
              projectTeamId: null,
            },
            {
              projectId: 3,
              projectName: '자율 프로젝트',
              projectTrack: null,
              projectTeamId: null,
            },
          ],
        }),
      );
    },
  ),

  rest.post(
    'http://localhost:3000/api/auth/user/request',
    async (request, response, context) => {
      const status: number = 200;
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];

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

      // 팀 지원 완료 시
      return response(
        context.json({
          success: true,
          message: '해당 팀의 팀장 승인 후 팀 합류가 최종적으로 완료됩니다.',
        }),
      );
    },
  ),
];
