import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { userSaga } from './user';

function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootSaga;
