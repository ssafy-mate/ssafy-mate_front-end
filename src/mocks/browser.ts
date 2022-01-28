import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { userHandlers } from './handlers/userHandlers';
import { teamHandlers } from './handlers/teamHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';
import { signInHandlers } from './handlers/signInHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...teamHandlers,
  ...chattingHandlers,
  ...signInHandlers,
);
