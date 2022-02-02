import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { userHandlers } from './handlers/userHandlers';
import { teamHandlers } from './handlers/teamHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';
import { techStackHandlers } from './handlers/techStackHandlers';
import { signInHandlers } from './handlers/signInHandlers';
import { projectHandlers } from './handlers/projectHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...teamHandlers,
  ...chattingHandlers,
  ...techStackHandlers,
  ...signInHandlers,
  ...projectHandlers,
);
