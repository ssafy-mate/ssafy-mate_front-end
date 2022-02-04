import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { signInHandlers } from './handlers/signInHandlers';
import { newPasswordHandlers } from './handlers/newPasswordHandlers';
import { userHandlers } from './handlers/userHandlers';
import { techStackHandlers } from './handlers/techStackHandlers';
import { teamHandlers } from './handlers/teamHandlers';
import { projectHandlers } from './handlers/projectHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...signInHandlers,
  ...newPasswordHandlers,
  ...userHandlers,
  ...techStackHandlers,
  ...teamHandlers,
  ...projectHandlers,
  ...chattingHandlers,
);
