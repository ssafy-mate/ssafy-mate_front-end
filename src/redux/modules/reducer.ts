import { connectRouter } from 'connected-react-router';

import { combineReducers } from 'redux';

import { History } from 'history';

const reducer = (history: History<unknown>) =>
  combineReducers({ router: connectRouter(history) });

export default reducer;
