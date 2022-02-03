import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';

import { ErrorBoundary } from 'react-error-boundary';

import { ReactQueryDevtools } from 'react-query/devtools';

import { Global } from '@emotion/react';

import reset from './styles/reset';

import 'swiper/css/bundle';

import history from './history';

import ScrollToTop from './utils/ScrollToTop';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NewPasswordPage from './pages/users/NewPasswordPage';
import UserInfoPage from './pages/users/UserInfoPage';
import TeamInfoPage from './pages/teams/TeamInfoPage';
import TeamCreatePage from './pages/projects/TeamCreatePage';
import TeamEditPage from './pages/projects/TeamEditPage';
import CommonProjectPage from './pages/CommonProjectPage';
import SpecializationProjectTeamListPage from './pages/projects/SpecializationProjectTeamListPage';
import SpecializationProjectUserListPage from './pages/projects/SpecializationProjectUserListPage';
import SpecializationProjectOfferListPage from './pages/projects/SpecializationProjectOfferListPage';
import AutonomyProjectPage from './pages/AutonomyProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import ChattingPage from './pages/ChattingPage';

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Global styles={reset} />
      <Router history={history}>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users/sign_in" component={SignInPage} />
          <Route exact path="/users/sign_up" component={SignUpPage} />
          <Route exact path="/users/password/new" component={NewPasswordPage} />
          <Route exact path="/users/:userId" component={UserInfoPage} />
          <Route exact path="/teams/:teamId" component={TeamInfoPage} />
          <Route
            exact
            path="/projects/team/create"
            component={TeamCreatePage}
          />
          <Route exact path="/projects/team/edit" component={TeamEditPage} />
          <Route exact path="/projects/common" component={CommonProjectPage} />
          <Route
            exact
            path="/projects/specialization/teams"
            component={SpecializationProjectTeamListPage}
          />
          <Route
            exact
            path="/projects/specialization/users"
            component={SpecializationProjectUserListPage}
          />
          <Route
            exact
            path="/projects/specialization/offer_list"
            component={SpecializationProjectOfferListPage}
          />
          <Route
            exact
            path="/projects/autonomy/"
            component={AutonomyProjectPage}
          />
          <Route exact path="/chatting/:roomId" component={ChattingPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <ReactQueryDevtools />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
