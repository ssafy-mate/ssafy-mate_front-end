import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import styled from '@emotion/styled';

import RefreshIcon from '@mui/icons-material/Refresh';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import useToken from '../../hooks/useToken';
import useReceiveRequests from '../../hooks/useReceiveRequests';

import RequestItem from './RequestItem';
import ErrorSection from '../common/ErrorSection';
import EmptyRequestBox from './EmptyRequestBox';

type Params = {
  userId: string;
};

const CURRENT_PROJECT = '특화 프로젝트';

const ReceiveRequestListSection: React.FC = () => {
  const token: string | null = useToken();
  const { userId } = useParams<Params>();
  const dispatch = useDispatch();

  const { isLoading, requests, isError, errorMessage, refetch } =
    useReceiveRequests(token, parseInt(userId), { project: CURRENT_PROJECT });

  const handleRefreshRequestData = () => {
    dispatch(
      showSsafyMateAlert({
        show: true,
        text: '최신 정보 업데이트',
        type: 'success',
      }),
    );
    refetch();
  };

  if (isError) {
    return <ErrorSection errorMessage={errorMessage} />;
  }

  return (
    <>
      {isLoading || !requests ? (
        <Backdrop
          open={true}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container>
          <Wrapper>
            <SectionHeader>
              <Head>특화 프로젝트 | 받은 제안</Head>
              <RefreshButton onClick={handleRefreshRequestData}>
                <RefreshIcon />
              </RefreshButton>
            </SectionHeader>
            <RequestList>
              {requests.length === 0 ? (
                <EmptyRequestBox message="아직 받은 제안이 없습니다." />
              ) : (
                requests.map((request) => (
                  <RequestItem
                    key={request.requestId}
                    requestId={request.requestId}
                    requestType="receive"
                    requestStatus={request.requestStatus}
                    originType={request.originType}
                    originId={request.originId}
                    originName={request.originName}
                    originImgUrl={request.originImgUrl}
                    originInfo={request.originInfo}
                    message={request.message}
                    createdTime={request.createdTime}
                    refetch={refetch}
                  />
                ))
              )}
            </RequestList>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  max-width: 800px;
  margin: 0 auto 120px;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 575px) {
    margin-top: 70px;
    margin-bottom: 80px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid #d7e2eb;
  border-radius: 4px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 4px 4px 0 0;
  background-color: #3396f4;
`;

const Head = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #fff;

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const RefreshButton = styled.div`
  border: none;
  transition: transform 0.08s ease-in-out;
  cursor: pointer;

  & svg {
    color: #fff;
    font-size: 24px;
  }

  &:hover {
    transform: rotate(45deg);
  }
`;

const RequestList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 575px) {
    padding: 12px;
  }
`;

export default ReceiveRequestListSection;
