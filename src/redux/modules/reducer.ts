import { connectRouter } from 'connected-react-router';

// import { History } from 'history';

import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import auth from './auth';
import user from './user';

import history from '../../history';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['router'],
};

const reducer = combineReducers({
  auth,
  user,
  router: connectRouter(history),
});

export default persistReducer(persistConfig, reducer);
