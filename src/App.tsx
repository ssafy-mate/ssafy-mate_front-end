import { useEffect } from 'react';

import ReactGA from 'react-ga';

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
import AccountEditPage from './pages/users/AccountEditPage';
import UserInfoPage from './pages/users/UserInfoPage';
import TeamInfoPage from './pages/teams/TeamInfoPage';
import TeamEditPage from './pages/teams/TeamEditPage';
import TeamCreatePage from './pages/projects/TeamCreatePage';
import SpecializationProjectTeamListPage from './pages/projects/SpecializationProjectTeamListPage';
import SpecializationProjectUserListPage from './pages/projects/SpecializationProjectUserListPage';
import SpecializationProjectReceiveRequestListPage from './pages/projects/SpecializationProjectReceiveRequestListPage';
import SpecializationProjectSendRequestListPage from './pages/projects/SpecializationProjectSendRequestListPage';
import ChattingPage from './pages/ChattingPage';
import PrivacyPage from './pages/policy/PrivacyPage';
import TermsOfServicePage from './pages/policy/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

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

    console.log(`
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⡟⣛⡻⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⡛⠭⠝⢛⡻⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣶⡆⢿⣿⣿⣿⡿⠛⠍⠊⠁⠀⣠⣤⣴⣾⣿⣿⣿⣷⣮⣝⡻⣿⣿⣿⣿⣿⢩⣽⣾⣾⣿⡝⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⢅⣶⣶⡈⠋⠊⠀⠀⠀⢀⣾⣿⣿⠿⣿⠿⢃⣿⣿⣿⣿⣿⣮⣙⠋⣯⣗⠹⣿⣿⣿⣿⣯⢻⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⢼⣿⣿⣿⣿⡯⢲⣿⡗⠜⠀⠀⠀⠀⣴⣿⣿⣿⠏⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⡆⢻⣿⣀⢿⣿⣿⣿⣿⡝⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⡏⣿⣿⣿⣿⣿⠕⣾⣿⠕⠆⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣯⠹⣿⣇⡸⣿⣿⣿⣿⣧⢿⣿⣿⣿⣿
    ⣿⣿⣿⣿⢱⣿⣿⣿⣿⡯⢲⣿⣟⢤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⡒⣿⣿⣀⢿⣿⣿⣿⣿⡼⣿⣿⣿⣿
    ⣿⣿⣿⣏⠾⢿⣿⣿⣿⠕⡾⣿⢇⢁⣀⣤⣤⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⠧⢼⣿⣇⡸⣿⣿⣿⣿⣗⢿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣶⣮⣭⣾⣿⣶⣾⣷⡻⡿⣡⣾⣿⠟⣠⣶⡄⠀⠀⠀⠀⠀⠀⠂⢀⠀⠀⠀⠀⠠⢸⣮⣭⣾⣆⣟⣫⣭⣶⣾⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢿⡿⢃⣴⣿⣿⠃⠀⠀⠀⠀⠄⠀⠀⠀⠈⠐⠠⣐⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣆⢿⣿⡟⣡⣾⡷⠀⠀⠀⠀⠈⠐⡠⠠⢔⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⡻⠿⣣⣂⣀⣘⣤⣀⣢⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⠛⠛⠛⠛⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠁⠀⣀⠀⢹⠏⠀⣀⡀⢘⣿⡟⠀⠈⢻⣿⠀⠀⣀⣀⡀⠀⢹⡏⠀⢰⣿⡏⠀⠀⢿⡟⠀⠀⣿⣿⠀⠀⠹⣿⣀⡀⠀⢀⣀⡏⠀⢀⣀⣀
    ⠀⠀⠉⠻⢿⡄⠀⠉⠛⢿⣿⠁⢠⠀⠘⣿⠀⠀⠛⠛⣻⡄⠀⠀⢠⣿⣿⡇⠀⠀⠘⠃⠀⠀⣿⠏⠀⡄⠀⢿⣿⡇⠀⢸⣿⡇⠀⠘⠛⠛
    ⢷⢦⣄⠀⠈⡿⢶⣄⡀⠀⠏⠀⠈⠁⠀⢹⠀⠀⣤⣤⣾⣷⡀⠀⣿⣿⣿⡇⠀⢠⠀⠀⡀⠀⡿⠀⠀⠉⠀⢸⣿⡇⠀⢸⣿⡇⠀⢠⣤⣤
    ⡀⠀⠉⢀⣠⣁⠀⠉⠀⢀⠆⠀⣶⣶⠀⢸⠀⠀⣿⣿⣿⣿⡇⠀⣿⣿⣿⡇⠀⢸⣄⣨⡇⠀⡇⠀⣶⣶⡀⠀⢿⡇⠀⢸⣿⣇⠀⠈⠉⠉
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

    >> GitHub URL: https://github.com/ssafy-mate
    `);
  }, []);

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
          <Route exact path="/users/account/edit" component={AccountEditPage} />
          <Route exact path="/users/:userId" component={UserInfoPage} />
          <Route exact path="/teams/:teamId" component={TeamInfoPage} />
          <Route exact path="/teams/:teamId/edit" component={TeamEditPage} />
          <Route exact path="/projects/teams/new" component={TeamCreatePage} />
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
            path="/projects/specialization/:userId/receive_requests"
            component={SpecializationProjectReceiveRequestListPage}
          />
          <Route
            exact
            path="/projects/specialization/:userId/send_requests"
            component={SpecializationProjectSendRequestListPage}
          />
          <Route exact path="/chatting/:myId" component={ChattingPage} />
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
    </ErrorBoundary>
  );
};

export default App;
