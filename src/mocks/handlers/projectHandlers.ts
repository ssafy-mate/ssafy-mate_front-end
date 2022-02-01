import { rest } from 'msw';

import { teamListData } from '../database/team';
import { userListData } from '../database/user';

export const projectHandlers = [
  rest.get(
    'http://localhost:3000/api/auth/project/team-list',
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
    'http://localhost:3000/api/auth/project/user-list',
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

      // 교육생 리스트 조회 성공 시
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
];
