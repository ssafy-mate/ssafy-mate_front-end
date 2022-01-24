import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ChattingForm from '../components/chatting/ChattingForm';

const ChattingPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <ChattingForm />
      </Container>
      {/* <Footer /> */}
    </>
  );
};

const Container = styled.main`
  width: 100%;
`;

export default ChattingPage;
