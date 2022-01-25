import { rest } from 'msw';

const teamDataList = [
  {
    teamData: {
      teamId: 1,
      createDateTime: '2022-01-24',
      owner: {
        userId: 1,
        userName: '조원빈',
      },
      teamImgUrl: '/images/common/ssafy-mate_logo.png',
      campus: '서울',
      project: '특화 프로젝트',
      projectTrack: '빅데이터',
      teamName: '데스파시토',
      notice: '실제 운영할 서비스 개발을 도전할 분들을 모집합니다.',
      introduction:
        '실사용자를 받는 플랫폼 개발에 도전하실 분들을 찾고 있습니다. 개발 효율성을 높이기 위해 API First Design 설계 방식으로 진행하려고 합니다. 서버에서는 Swagger를 이용하여 API 테스트를 진행하고, 클라이언트 팀은 정식 API가 배포되기 이전까지 Mock Service Worker를 이용하여 Mock을 만들어 개발을 진행하려고 합니다.',
      techStacks: [
        {
          id: 1,
          techStackName: 'TypeScript',
        },
        {
          id: 2,
          techStackName: 'React',
        },
        {
          id: 4,
          techStackName: 'Redux',
        },
        {
          id: 5,
          techStackName: 'Redux-Saga',
        },
        {
          id: 6,
          techStackName: 'React-Query',
        },
        {
          id: 7,
          techStackName: 'Emotion',
        },
        {
          id: 8,
          techStackName: 'Mock-Service-Worker',
        },
        {
          id: 9,
          techStackName: 'Spring-Boot',
        },
        {
          id: 10,
          techStackName: 'JPA',
        },
        {
          id: 11,
          techStackName: 'MySQL',
        },
        {
          id: 12,
          techStackName: 'Swagger',
        },
      ],
      members: [
        {
          userId: 1,
          userName: '조원빈',
          profileImgUrl: '/images/projects/sample-student_profile-img1.jpeg',
          ssafyTrack: 'Java Track',
          job1: '백엔드 (Back-end)',
        },
        {
          userId: 2,
          userName: '소정은',
          profileImgUrl: '/images/projects/sample-student_profile-img2.jpeg',
          ssafyTrack: 'Java Track',
          job1: '프론트엔드 (Front-end)',
        },
        {
          userId: 3,
          userName: '손영배',
          profileImgUrl: '/images/projects/sample-student_profile-img3.jpeg',
          ssafyTrack: 'Python Track',
          job1: '백엔드 (Back-end)',
        },
        {
          userId: 4,
          userName: '이정훈',
          profileImgUrl: '/images/projects/sample-student_profile-img4.jpeg',
          ssafyTrack: 'Java Track',
          job1: '백엔드 (Back-end)',
        },
      ],
      totalRecruitment: 6,
      frontendRecruitment: 3,
      backendRecruitment: 3,
      totalHeadcount: 4,
      frontendHeadcount: 1,
      backendHeadcount: 3,
    },
  },
];

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
      const index = teamDataList.findIndex(
        (team) => team.teamData.teamId === Number(teamId),
      );
      const token = request.headers['_headers'].authorization.split(' ')[1];

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

      if (index === -1) {
        return response(
          context.status(405),
          context.json({
            status: 402,
            success: false,
            message: '해당 팀 정보가 존재하지 않습니다.',
          }),
        );
      }

      return response(context.json(teamDataList[index]));
    },
  ),
];
