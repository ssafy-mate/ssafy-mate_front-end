import { connectRouter } from 'connected-react-router';

import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import history from '../../history';

import auth from './auth';
import user from './user';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const reducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    user,
    router: connectRouter(history),
  });

export default persistReducer(persistConfig, reducer);
