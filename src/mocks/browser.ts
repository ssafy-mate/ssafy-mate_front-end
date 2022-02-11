import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { signInHandlers } from './handlers/signInHandlers';
import { newPasswordHandlers } from './handlers/newPasswordHandlers';
import { findIdHandlers } from './handlers/findIdHandlers';
import { usersHandlers } from './handlers/usersHandlers';
import { teamsHandlers } from './handlers/teamsHandlers';
import { requestsHandlers } from './handlers/requestsHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';
import { techStacksHandlers } from './handlers/techStacksHandlers';

export const worker = setupWorker(
  // ...authHandlers,
  ...usersHandlers,
  // ...teamsHandlers,
  ...requestsHandlers,
  // ...chattingHandlers,
  // ...signInHandlers,
  // ...newPasswordHandlers,
  // ...findIdHandlers,
  // ...chattingHandlers,
  // ...techStacksHandlers,
);
