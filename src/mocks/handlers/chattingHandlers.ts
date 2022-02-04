import { rest } from 'msw';

import { roomDataList, chatLogList } from '../database/chatting';

export const chattingHandlers = [
  rest.get(
    'http://localhost:3000/api/chat/room/:userId',
    async (request, response, context) => {
      context.status(200);
      return response(context.json(roomDataList));
    },
  ),

  rest.get(
    'http://localhost:3000/api/chat/log',
    async (request, response, context) => {
      const { LogInfo } = request.params;
      context.status(200);
      return response(context.json(chatLogList));
    },
  ),
];
