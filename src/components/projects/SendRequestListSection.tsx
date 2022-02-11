import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import styled from '@emotion/styled';

import RefreshIcon from '@mui/icons-material/Refresh';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import useToken from '../../hooks/useToken';
import useSendRequests from '../../hooks/useSendRequests';

import TeamRequestItem from './TeamRequestItem';
import UserRequestItem from './UserRequestItem';
import ErrorSection from '../common/ErrorSection';
import EmptyRequestBox from './EmptyRequestBox';

type Params = {
  userId: string;
};

const CURRENT_PROJECT = '특화 프로젝트';

const SendRequestListSection: React.FC = () => {
  const token: string | null = useToken();
  const { userId } = useParams<Params>();
  const dispatch = useDispatch();

  const {
    isLoading,
    userRequests,
    teamRequests,
    isError,
    errorMessage,
    refetch,
  } = useSendRequests(token, parseInt(userId), { project: CURRENT_PROJECT });

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
      {isLoading || !userRequests || !teamRequests ? (
        <Backdrop
          open={true}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container onClick={() => refetch()}>
          <Wrapper>
            <SectionHeader>
              <Head>특화 프로젝트 | 보낸 요청</Head>
              <RefreshButton onClick={handleRefreshRequestData}>
                <RefreshIcon />
              </RefreshButton>
            </SectionHeader>
            <RequestList>
              {userRequests.length === 0 && teamRequests.length === 0 && (
                <EmptyRequestBox message={'아직 보낸 요청이 없습니다.'} />
              )}
              {userRequests.map((userRequest) => (
                <UserRequestItem
                  key={userRequest.requestId}
                  requestId={userRequest.requestId}
                  requestStatus={userRequest.requestStatus}
                  message={userRequest.message}
                  userId={userRequest.userId}
                  userName={userRequest.userName}
                  profileImgUrl={userRequest.profileImgUrl}
                  job1={userRequest.job1}
                  createdTime={userRequest.createdTime}
                  requestType="send"
                  refetch={refetch}
                />
              ))}
              {teamRequests.map((teamRequest) => (
                <TeamRequestItem
                  key={teamRequest.requestId}
                  requestId={teamRequest.requestId}
                  requestStatus={teamRequest.requestStatus}
                  message={teamRequest.message}
                  teamId={teamRequest.teamId}
                  teamName={teamRequest.teamName}
                  teamImgUrl={teamRequest.teamImgUrl}
                  campus={teamRequest.campus}
                  createdTime={teamRequest.createdTime}
                  requestType="send"
                  refetch={refetch}
                />
              ))}
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
  background-color: #ffc00a;
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
`;

export default SendRequestListSection;
