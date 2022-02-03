import { connectRouter } from 'connected-react-router';

import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import history from '../../history';

import auth from './auth';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['router'],
};

const reducer = combineReducers({
  auth,
  router: connectRouter(history),
});

export default persistReducer(persistConfig, reducer);
