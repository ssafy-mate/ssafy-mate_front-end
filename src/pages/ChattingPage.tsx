import { Redirect } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import useToken from '../hooks/useToken';

import Header from '../components/common/Header';
import ChattingForm from '../components/chatting/ChattingForm';
import useSocket from '../hooks/useSocket';
import useUserId from '../hooks/useUserId';
import { useEffect } from 'react';

const ChattingPage: React.FC = () => {
  const token = useToken();
  const userId = useUserId();
  const [socket, disconnect] = useSocket(userId as number);

  useEffect(() => {
    if (token && socket) {
      socket?.emit('login', { id: userId });
    }
  }, [socket, token, userId]);

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header offFixed={true} />
      <Container>
        <ChattingForm />
      </Container>
    </>
  );
};

const Container = styled.main`
  width: 100%;
`;

export default ChattingPage;
