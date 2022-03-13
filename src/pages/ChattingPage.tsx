import { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import useToken from '../hooks/reduxHooks/useToken';
import useUserId from '../hooks/reduxHooks/useUserId';
import useSocket from '../hooks/useSocket';
import useDocumentTitle from '../hooks/useDocumentTitle';

import Header from '../components/common/Header';
import ChattingForm from '../components/chatting/ChattingForm';

const ChattingPage: React.FC = () => {
  const token = useToken();
  const userId = useUserId();
  const [socket] = useSocket(userId as number);

  useDocumentTitle('채팅 | 싸피 메이트');

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
