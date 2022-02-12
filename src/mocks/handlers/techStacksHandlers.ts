import { rest } from 'msw';

import { techStackListData } from '../database/techstack';

export const techStacksHandlers = [
  rest.get(
    `${process.env.REACT_APP_SERVER_URL}/api/techstacks`,
    async (request, response, context) => {
      const status: number = 200;

      // 기술 스택 목록 조회 실패
      if (status === 500) {
        return response(
          context.json({
            status: 500,
            success: false,
            message: 'Internal Server Error, 기술 스택 리스트 조회 실패',
          }),
        );
      }

      // 기술 스택 목록 조회 성공
      return response(
        context.json({
          techStackList: techStackListData,
        }),
      );
    },
  ),
];
