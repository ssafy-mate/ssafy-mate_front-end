import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { profileSaga } from './profile';
import { myTeamSaga } from './myTeam';

function* rootSaga() {
  yield all([authSaga(), myTeamSaga(), profileSaga()]);
}

export default rootSaga;
