import { all } from 'redux-saga/effects';

import { authSaga } from './auth';

function* rootSaga() {
  yield all([authSaga()]);
}

export default rootSaga;
