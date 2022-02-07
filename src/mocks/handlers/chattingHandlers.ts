import { rest } from 'msw';

import { roomDataList, chatLogList } from '../database/chatting';

export const chattingHandlers = [
  rest.get(
    'https://i6a402.p.ssafy.io:8443/api/chat/room/:userId',
    async (request, response, context) => {
      context.status(200);
      return response(context.json(roomDataList));
    },
  ),

  rest.get(
    'https://i6a402.p.ssafy.io:8443/api/chat/log',
    async (request, response, context) => {
      const { LogInfo } = request.params;
      context.status(200);
      return response(context.json(chatLogList));
    },
  ),
];
