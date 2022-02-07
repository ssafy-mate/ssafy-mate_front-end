import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { profileSaga } from './profile';

function* rootSaga() {
  yield all([authSaga(), profileSaga()]);
}

export default rootSaga;
