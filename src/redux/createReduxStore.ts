import { routerMiddleware } from 'connected-react-router';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './modules/reducer';
import rootSaga from './modules/rootSaga';

import history from '../history';

const createReduxStore = () => {
  const sagaMiddleWare = createSagaMiddleware();
  const store = createStore(
    reducer(history),
    {},
    composeWithDevTools(
      applyMiddleware(sagaMiddleWare, routerMiddleware(history)),
    ),
  );

  sagaMiddleWare.run(rootSaga);

  return store;
};

export default createReduxStore;
