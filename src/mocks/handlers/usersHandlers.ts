import { rest } from 'msw';

import { userDataList, userListData } from '../database/user';
import { teamDataListData } from '../database/team';

export const usersHandlers = [
  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/users`,
    async (request, response, context) => {
      const token = request.headers['_headers'].authorization.split(' ')[1];
      const campus = request.url.searchParams.get('campus');
      const project_track = request.url.searchParams.get('project_track');
      const job1 = request.url.searchParams.get('job1');
      const techstack_code = request.url.searchParams.get('techstack_code');
      const user_name = request.url.searchParams.get('user_name');
      const ssafy_track = request.url.searchParams.get('ssafy_track');
      const exclusion = request.url.searchParams.get('exclusion');
      const sort = request.url.searchParams.get('sort');

      const filteredUserListData = userListData
        .filter((user) => campus === 'all' || user.campus === campus)
        .filter(
          (user) =>
            project_track === 'all' || user.projectTrack === project_track,
        )
        .filter((user) => job1 === 'all' || user.job1 === job1)
        .filter(
          (team) =>
            techstack_code === null ||
            team.techStacks.filter(
              (techStack) => techStack.id === Number(techstack_code),
            ).length > 0,
        )
        .filter(
          (user) =>
            user_name === null ||
            user.userName.toLowerCase().includes(user_name.toLowerCase()),
        )
        .filter(
          (user) => ssafy_track === 'all' || user.ssafyTrack === ssafy_track,
        )
        .filter((user) =>
          exclusion === 'true' ? user.belongToTeam !== true : true,
        );
      const status: number = 200;

      // 로그인 안 되어 있을 시
      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message:
              '교육생 공고 조회 권한이 없습니다. 로그인 후 이용 가능합니다.',
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
            message: 'Internal Server, 내 팀 아이디 조회 실패',
          }),
        );
      }

      // 교육생 공고 조회 성공 시
      return response(
        context.json({
          users: filteredUserListData,
          totalPage: 1,
          nowPage: 1,
          totalElement: filteredUserListData.length,
        }),
      );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/users/:userId`,
    async (request, response, context) => {
      const { userId } = request.params;
      const userIndex: number = userDataList.findIndex(
        (user) => user.userData.userId === Number(userId),
      );
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];

      // 로그인 안 되어 있을 시
      if (token === null) {
        return response(
          context.status(401),
          context.json({
            status: 401,
            success: false,
            message:
              '해당 교육생 정보 조회 권한이 없습니다. 로그인 후 이용 가능합니다.',
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
    `${process.env.REACT_APP_SERVER_URL}/api/auth/users/:userId/project-tracks`,
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 로그인 안 되어 있을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 401,
            success: false,
            message: '트랙 선택 권한이 없습니다. 로그인 후 이용 가능합니다.',
          }),
        );
      }

      // 유효하지 않는 토큰일 시
      if (status === 403) {
        return response(
          context.status(403),
          context.json({
            status: 401,
            success: false,
            message: '트랙 선택 권한이 없습니다.',
          }),
        );
      }

      // 이미 트랙 선택 완료 시
      if (status === 409) {
        return response(
          context.status(409),
          context.json({
            status: 409,
            success: false,
            message: '이미 트랙 선택을 완료하였습니다.',
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
            message: 'Internal Server Error, 프로젝트 트랙 선택 실패',
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
    `${process.env.REACT_APP_SERVER_URL}/api/auth/users/:userId/projects`,
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 토큰이 유효하지 않을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '내 프로젝트 정보 조회 권한이 없습니다.',
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
            message: 'Internal Server Error, 내 프로젝트 정보 갱신 실패',
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

  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/users/:userId/team-id`,
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      // 토큰이 유효하지 않을 시
      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '내 팀 아이디 조회 권한이 없습니다.',
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
            message: 'Internal Server, 내 팀 아이디 조회 실패',
          }),
        );
      }

      return response(context.json({ teamId: 1 }));
    },
  ),

  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/users/:userId/my-team`,
    async (request, response, context) => {
      const token: string =
        request.headers['_headers'].authorization.split(' ')[1];
      const status: number = 200;

      if (token === null) {
        return response(
          context.status(403),
          context.json({
            status: 403,
            success: false,
            message: '내 팀 정보 조회 권한이 없습니다."',
          }),
        );
      }

      if (status === 500) {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server, 내 팀 정보 조회 실패',
          }),
        );
      }

      return response(
        context.json({
          teamData: teamDataListData[0].teamData,
          role: 'owner',
        }),
      );
    },
  ),
];
