import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import createReduxStore from './redux/createReduxStore';

import App from './App';

const store = createReduxStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
