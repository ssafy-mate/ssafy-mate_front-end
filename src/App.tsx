import { useEffect, Suspense, lazy } from 'react';

import ReactGA from 'react-ga';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';

import { ErrorBoundary } from 'react-error-boundary';

import { ReactQueryDevtools } from 'react-query/devtools';

import { Global } from '@emotion/react';

import 'swiper/css/bundle';

import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';
import sweetAlertStyles from './styles/sweetAlertStyles';

import history from './history';

import ScrollToTop from './utils/ScrollToTop';

import LoadingCircular from './components/common/LoadingCircular';

const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const NewPasswordPage = lazy(() => import('./pages/users/NewPasswordPage'));
const FindUserIdPage = lazy(() => import('./pages/users/FindUserIdPage'));
const AccountEditPage = lazy(() => import('./pages/users/AccountEditPage'));
const UserInfoPage = lazy(() => import('./pages/users/UserInfoPage'));
const TeamInfoPage = lazy(() => import('./pages/teams/TeamInfoPage'));
const TeamEditPage = lazy(() => import('./pages/teams/TeamEditPage'));
const TeamCreatePage = lazy(() => import('./pages/projects/TeamCreatePage'));
const SpecializedProjectTeamListPage = lazy(
  () => import('./pages/projects/SpecializedProjectTeamListPage'),
);
const SpecializedProjectUserListPage = lazy(
  () => import('./pages/projects/SpecializedProjectUserListPage'),
);
const SpecializedProjectReceiveRequestListPage = lazy(
  () => import('./pages/projects/SpecializedProjectReceiveRequestListPage'),
);
const SpecializedProjectSendRequestListPage = lazy(
  () => import('./pages/projects/SpecializedProjectSendRequestListPage'),
);
const ChatPage = lazy(() => import('./pages/ChatPage'));
const PrivacyPage = lazy(() => import('./pages/policy/PrivacyPage'));
const TermsOfServicePage = lazy(
  () => import('./pages/policy/TermsOfServicePage'),
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

ReactGA.event({
  category: 'User',
  action: 'Created an Account',
});

ReactGA.exception({
  description: 'An error ocurred',
  fatal: true,
});

const App: React.FC = () => {
  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID}`);
    history.listen((location: any) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });

    console.log('> GitHub Repository URL: https://github.com/ssafy-mate');
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <Global styles={sweetAlertStyles} />
      <Suspense fallback={<LoadingCircular />}>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users/sign_in" component={SignInPage} />
            <Route exact path="/users/sign_up" component={SignUpPage} />
            <Route
              exact
              path="/users/password/new"
              component={NewPasswordPage}
            />
            <Route exact path="/users/find/id" component={FindUserIdPage} />
            <Route
              exact
              path="/users/account/edit"
              component={AccountEditPage}
            />
            <Route exact path="/users/:userId" component={UserInfoPage} />
            <Route exact path="/teams/:teamId" component={TeamInfoPage} />
            <Route exact path="/teams/:teamId/edit" component={TeamEditPage} />
            <Route
              exact
              path="/projects/teams/new"
              component={TeamCreatePage}
            />
            <Route
              exact
              path="/projects/specialization/teams"
              component={SpecializedProjectTeamListPage}
            />
            <Route
              exact
              path="/projects/specialization/users"
              component={SpecializedProjectUserListPage}
            />
            <Route
              exact
              path="/projects/specialization/:userId/receive_requests"
              component={SpecializedProjectReceiveRequestListPage}
            />
            <Route
              exact
              path="/projects/specialization/:userId/send_requests"
              component={SpecializedProjectSendRequestListPage}
            />
            <Route exact path="/chatting/:myId" component={ChatPage} />
            <Route exact path="/privacy" component={PrivacyPage} />
            <Route
              exact
              path="/terms_of_service"
              component={TermsOfServicePage}
            />
            <Route component={NotFoundPage} />
          </Switch>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
