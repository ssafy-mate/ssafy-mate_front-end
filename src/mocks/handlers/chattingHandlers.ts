import { rest } from 'msw';

export const chattingHandlers = [
  rest.get(
    'http://i6a402.p.ssafy.io:8081/api/chat/room/:userId',
    async (request, response, context) => {
      const status: number = 200;

      console.log(
        `[GET | /api/chat/room/:userId ], ${JSON.stringify(request.body)}`,
      );

      switch (status) {
        case 401:
          return response(
            context.json({
              status: 401,
              success: false,
              message: '인증에 실패했습니다.',
            }),
          );
        default:
          return response(
            context.json({
              roomList: [
                {
                  roomId: '1-2',
                  userId: 1,
                  userName: '소정은',
                  profileImg: '/src/main/~~~',
                  content: '안녕하세요',
                  sentTime: '2022-01-17T17:03:45.336763',
                },
                {
                  roomId: '2-3',
                  userId: 3,
                  userName: '조원빈',
                  profileImg: '/src/main/~~~',
                  content: '안녕하세요',
                  sentTime: '2022-01-17T17:03:36.336763',
                },
              ],
            }),
          );
      }
    },
  ),

  rest.get(
    'http://i6a402.p.ssafy.io:8081/api/chat/log',
    async (request, response, context) => {
      const status: number = 200;

      console.log(
        `[GET | /api/chat/chat/log ], ${JSON.stringify(request.body)}`,
      );

      switch (status) {
        case 401:
          return response(
            context.json({
              status: 401,
              success: false,
              message: '인증에 실패했습니다.',
            }),
          );
        default:
          return response(
            context.json({
              contentList: [
                {
                  id: 14,
                  content: '추가 데이터11',
                  userName: '손영배',
                  sentTime: '2022-01-17T17:03:48.336763',
                  senderId: 1,
                },
                {
                  id: 13,
                  content: '추가 데이터11',
                  userName: '조원빈',
                  sentTime: '2022-01-17T17:03:47.336763',
                  senderId: 2,
                },
                {
                  id: 12,
                  content: '추가 데이터11',
                  userName: '손영배',
                  sentTime: '2022-01-17T17:03:46.336763',
                  senderId: 1,
                },
                {
                  id: 11,
                  content: '추가 데이터11',
                  userName: '조원빈',
                  sentTime: '2022-01-17T17:03:45.336763',
                  senderId: 2,
                },
                {
                  id: 10,
                  content: '추가 데이터10',
                  userName: '손영배',
                  sentTime: '2022-01-17T17:03:44.336763',
                  senderId: 1,
                },
              ],
              totalPages: 3,
            }),
          );
      }
    },
  ),
];
