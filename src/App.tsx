import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';

import { ErrorBoundary } from 'react-error-boundary';

import { ReactQueryDevtools } from 'react-query/devtools';

import { Global } from '@emotion/react';

import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';
import sweetAlertStyles from './styles/sweetAlertStyles';

import 'swiper/css/bundle';

import history from './history';

import ScrollToTop from './utils/ScrollToTop';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NewPasswordPage from './pages/users/NewPasswordPage';
import FindUserIdPage from './pages/users/FindUserIdPage';
import UserInfoPage from './pages/users/UserInfoPage';
import TeamInfoPage from './pages/teams/TeamInfoPage';
import TeamEditPage from './pages/teams/TeamEditPage';
import TeamCreatePage from './pages/projects/TeamCreatePage';
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
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <Global styles={sweetAlertStyles} />
      <Router history={history}>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users/sign_in" component={SignInPage} />
          <Route exact path="/users/sign_up" component={SignUpPage} />
          <Route exact path="/users/password/new" component={NewPasswordPage} />
          <Route exact path="/users/find/id" component={FindUserIdPage} />
          <Route exact path="/users/:userId" component={UserInfoPage} />
          <Route exact path="/teams/:teamId" component={TeamInfoPage} />
          <Route exact path="/teams/:teamId/edit" component={TeamEditPage} />
          <Route exact path="/projects/teams/new" component={TeamCreatePage} />
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
        {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />} */}
      </Router>
    </ErrorBoundary>
  );
};

export default App;
