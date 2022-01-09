import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { ConnectedRouter as Router } from 'connected-react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import history from './history';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/sign_in" component={SignInPage} />
          <Route path="/sign_up" component={SignUpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
