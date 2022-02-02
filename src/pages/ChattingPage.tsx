/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ChattingForm from '../components/chatting/ChattingForm';

const ChattingPage: React.FC = () => {
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
