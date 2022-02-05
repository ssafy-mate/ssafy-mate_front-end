import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { signInHandlers } from './handlers/signInHandlers';
import { newPasswordHandlers } from './handlers/newPasswordHandlers';
import { findIdHandlers } from './handlers/findIdHandlers';
import { userHandlers } from './handlers/userHandlers';
import { techStackHandlers } from './handlers/techStackHandlers';
import { teamHandlers } from './handlers/teamHandlers';
import { projectHandlers } from './handlers/projectHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...signInHandlers,
  ...newPasswordHandlers,
  ...findIdHandlers,
  ...userHandlers,
  ...techStackHandlers,
  ...teamHandlers,
  ...projectHandlers,
  ...chattingHandlers,
);
