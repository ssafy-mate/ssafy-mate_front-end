import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { teamHandlers } from './handlers/teamHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...teamHandlers,
  ...chattingHandlers,
);
