import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { login as loginSagaStart } from '../redux/modules/auth';

import SignInCard from '../components/signIn/SignInCard';

const SignInContainer = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    (requestData) => {
      dispatch(loginSagaStart(requestData));
    },
    [dispatch],
  );

  return <SignInCard login={login} />;
};

export default SignInContainer;
