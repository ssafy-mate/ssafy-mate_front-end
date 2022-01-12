import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ConnectedRouter as Router } from 'connected-react-router';

import { ErrorBoundary } from 'react-error-boundary';

import history from './history';

import { Global } from '@emotion/react';

import reset from './styles/reset';

import 'swiper/css/bundle';

import ScrollToTop from './utils/ScrollToTop';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CommonProjectPage from './pages/CommonProjectPage';
import TeamSpecializationProjectPage from './pages/TeamSpecializationProjectPage';
import StduentSpecializationProjectPage from './pages/StduentSpecializationProjectPage';
import AutonomyProjectPage from './pages/AutonomyProjectPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Global styles={reset} />
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/users/sign_in" component={SignInPage} />
          <Route path="/users/sign_up" component={SignUpPage} />
          <Route path="/projects/common" component={CommonProjectPage} />
          <Route
            path="/projects/specialization/team"
            component={TeamSpecializationProjectPage}
          />
          <Route
            path="/projects/specialization/student"
            component={StduentSpecializationProjectPage}
          />
          <Route path="/projects/autonomy/" component={AutonomyProjectPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
