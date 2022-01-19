import React from 'react';
import ReactDOM from 'react-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Provider } from 'react-redux';

import createReduxStore from './redux/createReduxStore';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');

  worker.start();
}

const queryClient = new QueryClient();
const store = createReduxStore();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root'),
);
