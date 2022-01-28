import { connectRouter } from 'connected-react-router';

import { combineReducers } from 'redux';

import { History } from 'history';

import auth from './auth';
import user from './user';

const reducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    user,
    router: connectRouter(history),
  });

export default reducer;
