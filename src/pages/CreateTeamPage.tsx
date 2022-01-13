import React from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CreateTeamForm from '../components/projects/CreateTeamForm';

const CreateTeamPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <CreateTeamForm />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 140px;
  padding: 0 16px;

  @media (max-width: 580px) {
    margin-top: 120px;
  }
  @media (max-width: 414px) {
    margin-top: 100px;
  }
`;

export default CreateTeamPage;
