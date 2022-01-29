import { routerMiddleware } from 'connected-react-router';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './modules/reducer';
import rootSaga from './modules/rootSaga';

import history from '../history';
import TokenService from '../services/TokenService';

const createReduxStore = () => {
  const token = TokenService.get();

  const sagaMiddleWare = createSagaMiddleware();

  const store = createStore(
    reducer(history),
    {
      auth: {
        userId: null,
        userName: null,
        userEmail: null,
        studentNumber: null,
        campus: null,
        ssafyTrack: null,
        token: token,
        projects: null,
        loading: false,
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
