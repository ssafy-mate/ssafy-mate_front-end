import { all } from 'redux-saga/effects';

import { userSaga } from './user';

function* rootSaga() {
  yield all([userSaga()]);
}

export default rootSaga;
