import { setupWorker } from 'msw';

import { authHandlers } from './handlers/authHandlers';
import { signInHandlers } from './handlers/signInHandlers';
import { newPasswordHandlers } from './handlers/newPasswordHandlers';
import { findIdHandlers } from './handlers/findIdHandlers';
import { usersHandlers } from './handlers/usersHandlers';
import { teamsHandlers } from './handlers/teamsHandlers';
import { requestsHandlers } from './handlers/requestsHandlers';
import { chattingHandlers } from './handlers/chattingHandlers';
import { techStackHandlers } from './handlers/techStackHandlers';

export const worker = setupWorker(
  // ...authHandlers,
  ...usersHandlers,
  ...teamsHandlers,
  ...requestsHandlers,
  ...chattingHandlers,
  // ...techStackHandlers,
  // ...signInHandlers,
  ...newPasswordHandlers,
  ...findIdHandlers,
  ...chattingHandlers,
  ...techStackHandlers,
);
