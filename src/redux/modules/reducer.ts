import { connectRouter } from 'connected-react-router';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from '../../history';

import auth from './auth';
import controlAlert from './alert';
import profile from './profile';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile'],
  blacklist: ['router'],
};

const reducer = combineReducers({
  auth,
  controlAlert,
  profile,
  router: connectRouter(history),
});

export default persistReducer(persistConfig, reducer);
