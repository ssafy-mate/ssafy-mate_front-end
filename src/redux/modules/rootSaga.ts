import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { myTeamSaga } from './myTeam';

function* rootSaga() {
  yield all([authSaga(), myTeamSaga()]);
}

export default rootSaga;
