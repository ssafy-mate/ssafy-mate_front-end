import { Link, useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import CloudOffIcon from '@mui/icons-material/CloudOff';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

interface ErrorSectionProps {
  errorMessage?: string;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ errorMessage }) => {
  const history = useHistory();

  const handleReturnButtonClick = () => {
    history.goBack();
  };

  return (
    <Container>
      <Wrapper>
        <ErrorHeader>
          <CloudOffIcon />
        </ErrorHeader>
        <ErrorBody>
          <Title>요청을 처리하는 도중에 오류가 발생했습니다!</Title>
          <Message>{errorMessage}</Message>
        </ErrorBody>
        <ErrorFooter>
          <HomeLink to="/">
            <HomeIcon />
            홈으로
          </HomeLink>
          <ReturnButton onClick={handleReturnButtonClick}>
            <AssignmentReturnIcon />
            이전 페이지로
          </ReturnButton>
        </ErrorFooter>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 80px 0;
`;

const ErrorHeader = styled.div`
  margin-bottom: 24px;

  & svg {
    font-size: 90px;
    color: #3396f4;
  }

  @media (max-width: 575px) {
    margin-bottom: 20px;

    & svg {
      font-size: 80px;
    }
  }
`;

const ErrorBody = styled.div`
  margin-bottom: 40px;

  @media (max-width: 575px) {
    margin-bottom: 32px;
  }
`;

const Title = styled.h1`
  margin-bottom: 8px;
  font-size: 20px;
  line-height: 1.6;

  @media (max-width: 575px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`;

const Message = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
  color: #5f7f90;

  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const ErrorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 0 10px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }

  & svg {
    margin-right: 6px;
  }

  @media (max-width: 575px) {
    margin: 0 8px;
    font-size: 14px;

    & svg {
      font-size: 20px;
    }
  }
`;

const ReturnButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 0 10px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #e9ecf3;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #263747;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #d1d4da;
  }

  & svg {
    margin-right: 6px;
  }

  @media (max-width: 575px) {
    font-size: 14px;

    & svg {
      font-size: 20px;
    }
  }
`;

export default ErrorSection;
