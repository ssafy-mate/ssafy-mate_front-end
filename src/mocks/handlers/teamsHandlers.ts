import { response, rest } from 'msw';

import { teamListData, teamDataListData, teamEditData } from '../database/team';

export const teamsHandlers = [
  rest.post(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams`,
    async (request, response, context) => {
      const token: string | null =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '팀 생성 권한이 없습니다. 로그인 후 이용 가능합니다.',
          }),
        );
      }

      if (status === 403) {
        return response(
          context.json({
            status: 403,
            success: false,
            message:
              '해당 프로젝트 팀에 이미 합류되어 있어 팀 생성이 불가능합니다.',
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
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams`,
    async (request, response, context) => {
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const campus = request.url.searchParams.get('campus');
      const project_track = request.url.searchParams.get('project_track');
      const job1 = request.url.searchParams.get('job1');
      const techstack_code = request.url.searchParams.get('techstack_code');
      const team_name = request.url.searchParams.get('team_name');
      const exclusion = request.url.searchParams.get('exclusion');
      const sort = request.url.searchParams.get('sort');

      const filteredTeamListData = teamListData
        .filter((team) => campus === 'all' || team.campus === campus)
        .filter(
          (team) =>
            project_track === 'all' || team.projectTrack === project_track,
        )
        .filter((team) =>
          job1 === '프론트엔드 (Front-end)'
            ? team.frontendRecruitment > team.frontendHeadcount
            : job1 === '백엔드 (Back-end)'
            ? team.backendRecruitment > team.backendHeadcount
            : true,
        )
        .filter(
          (team) =>
            team.techStacks.filter(
              (techStack) =>
                techstack_code === null ||
                techStack.id === Number(techstack_code),
            ).length > 0,
        )
        .filter(
          (team) =>
            team_name === null ||
            team.teamName.toLowerCase().includes(team_name.toLowerCase()),
        )
        .filter((team) =>
          exclusion === 'true' ? team.isRecruiting === true : true,
        )
        .slice()
        .sort((a, b) => {
          if (sort === 'recent') {
            return Number(a.createDateTime) - Number(b.createDateTime);
          } else if (sort === 'headcount') {
            return (
              b.totalRecruitment -
              b.totalHeadcount -
              (a.totalRecruitment - a.totalHeadcount)
            );
          } else {
            return 0;
          }
        });
      const status: number = 200;

      // 로그인 안 되어 있을 시
      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            meesage: '팀 공고 조회 권한이 없습니다. 로그인 후 이용 가능합니다.',
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
            message: 'Internal Server, 팀 공고 조회 실패',
          }),
        );
      }

      // 팀 공고 조회 성공 시
      return response(
        context.json({
          teams: filteredTeamListData,
          totalPage: 1,
          nowPage: 1,
          totalElement: filteredTeamListData.length,
        }),
      );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams/:teamId`,
    async (request, response, context) => {
      const { teamId } = request.params;
      const teamIndex = teamDataListData.findIndex(
        (team) => team.teamData.teamId === Number(teamId),
      );
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 토큰이 유효하지 않을 시
      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message:
              '팀 상세 정보 조회 권한이 없습니다. 로그인 후 이용 가능합니다.',
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

      if (status === 500) {
        return response(
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 팀 상세 정보 조회 실패',
          }),
        );
      }

      // 팀 상세 정보 조회 성공 시
      return response(
        context.json({
          teamData: teamDataListData[teamIndex].teamData,
          role: 'owner',
        }),
      );
    },
  ),

  rest.put(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams/:teamId`,
    async (request, response, context) => {
      const { teamId } = request.params;
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 로그인이 안 되어 있을 시
      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message: '팀 상세 정보 수정 권한이 없습니다.',
          }),
        );
      }

      // 팀 상세 정보 수정 권한 없을 시
      if (status === 403) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '팀 상세 정보 수정 권한이 없습니다.',
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
            message: 'Internal Server, 팀 상세 정보 수정 실패',
          }),
        );
      }

      // 팀 상세 정보 수정 성공 시
      return response(
        context.json({
          teamId: 1,
          message: '팀 상세 정보 수정이 완료되었습니다.',
        }),
      );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams/:teamId/edit`,
    async (request, response, context) => {
      const { teamId } = request.params;
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 팀 수정 권한이 없을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '팀을 수정할 수 있는 권한이 없습니다.',
          }),
        );
      }

      if (status === 500) {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server, 팀 수정 페이저 접근 실패',
          }),
        );
      }

      return response(context.json(teamEditData));
    },
  ),

  rest.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams/:teamId`,
    async (request, repsons, context) => {
      const { teamId } = request.params;
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 팀 삭제 권한이 없을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '팀을 삭제할 수 있는 권한이 없습니다.',
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
            message: 'Internal Server, 팀 삭제 처리 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '새로운 팀에 지원해보세요.',
        }),
      );
    },
  ),

  rest.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/teams/:teamId/leave`,
    async (request, response, context) => {
      const { teamId } = request.params;
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 팀 탈퇴 권한이 없을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '팀을 탈퇴할 수 있는 권한이 없습니다.',
          }),
        );
      }

      // 합류된 팀이 아닐 시
      if (status === 409) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: true,
            message: '합류된 팀이 아닙니다.',
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
            message: 'Internal Server, 팀 탈퇴 처리 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '새로운 팀을 다시 지원해보세요.',
        }),
      );
    },
  ),
];
