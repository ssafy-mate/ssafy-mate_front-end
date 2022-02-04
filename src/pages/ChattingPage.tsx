/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ChattingForm from '../components/chatting/ChattingForm';
import ChattingForm2 from '../components/chatting/ChattingForm2';

const ChattingPage: React.FC = () => {
  return (
    <>
      <Header offFixed={true} />
      <Container>
        <ChattingForm2 />
      </Container>
    </>
  );
};

const Container = styled.main`
  width: 100%;
`;

export default ChattingPage;
