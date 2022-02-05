import { routerMiddleware } from 'connected-react-router';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './modules/reducer';
import rootSaga from './modules/rootSaga';

import history from '../history';
import TokenService from '../services/TokenService';
import controlAlert from './modules/alert';

const createReduxStore = () => {
  const token = TokenService.get();
  const sagaMiddleWare = createSagaMiddleware();

  const store = createStore(
    reducer,
    {
      auth: {
        userId: null,
        userName: null,
        userEmail: null,
        studentNumber: null,
        campus: null,
        ssafyTrack: null,
        projects: null,
        token,
        loading: false,
        message: null,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(sagaMiddleWare, routerMiddleware(history)),
    ),
  );

  sagaMiddleWare.run(rootSaga);

  return store;
};

export default createReduxStore;
