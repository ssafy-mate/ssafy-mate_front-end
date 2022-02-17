import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import dayjs from 'dayjs';

import styled from '@emotion/styled';

import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';

import Swal from 'sweetalert2';

import {
  Request,
  RequestStatusType,
  RequestType,
  ResponseOfTheRequestType,
  ResponseStatusType,
} from '../../types/userTypes';

import useToken from '../../hooks/useToken';

import RequestService from '../../services/RequestService';

interface RequestItemProps extends Request {
  requestType: RequestType;
  refetch: () => void;
}

interface ButtonProps {
  color: string;
  colorWithHover: string;
}

interface OfferStatusProps {
  color: string;
  backgroundColor: string;
}

interface ItemProps {
  requestStatus: RequestStatusType;
}

const RequestItem: React.FC<RequestItemProps> = ({
  requestId,
  requestType,
  requestStatus,
  originType,
  originId,
  originName,
  originImgUrl,
  originInfo,
  message,
  createdTime,
  refetch,
}) => {
  const dispatch = useDispatch();
  const token: string | null = useToken();

  const sendResponse = (responseOfTheRequest: ResponseOfTheRequestType) => {
    RequestService.sendResponseOfTheRequest(token, responseOfTheRequest)
      .then((message: string) => {
        Swal.fire({
          title: message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error: any) => {
        Swal.fire({
          title: '응답 오류',
          text: error.response.data.message,
          icon: 'warning',
          confirmButtonColor: '#3396f4',
          confirmButtonText: '확인',
        });
      })
      .finally(() => refetch());
  };

  const handleSendResponse = (response: ResponseStatusType) => {
    const responseOfTheRequest: ResponseOfTheRequestType = {
      requestId,
      response,
    };

    sendResponse(responseOfTheRequest);
  };

  const handleDeleteRequestItem = () => {
    RequestService.deleteRequestItem(token, requestId)
      .then((message: string) => {
        dispatch(
          showSsafyMateAlert({
            show: true,
            text: message,
            type: 'success',
          }),
        );
      })
      .catch((error: any) => {
        dispatch(
          showSsafyMateAlert({
            show: true,
            text: error.response.data.message,
            type: 'warning',
          }),
        );
      })
      .finally(() => refetch());
  };

  return (
    <Item requestStatus={requestStatus}>
      <ItemBody>
        <ImgWrapper>
          <Img
            src={
              originImgUrl !== null
                ? originImgUrl
                : originType === 'user'
                ? '/images/assets/basic-profile-img.png'
                : '/images/assets/basic-team-logo.png'
            }
            alt={`${originName}${
              originType === 'user' ? '님의 프로필 이미지' : ' 팀 로고'
            }`}
          />
        </ImgWrapper>
        <Contents>
          <Message>{message}</Message>
          <InfoList>
            <NameLink
              to={`/${originType === 'user' ? 'users' : 'teams'}/${originId}`}
            >
              {originName}
            </NameLink>
            <InfoItem>{originInfo}</InfoItem>
          </InfoList>
          <RequestStatusWrapper>
            {(() => {
              switch (requestStatus) {
                case 'pending':
                  return (
                    <RequestStatus color="#4ab050" backgroundColor="#ecf7ed">
                      수락 대기 중
                    </RequestStatus>
                  );
                case 'approval':
                  return (
                    <RequestStatus color="#3396f4" backgroundColor="#eaf4fd">
                      제안 수락
                    </RequestStatus>
                  );
                case 'rejection':
                  return (
                    <RequestStatus color="#f5554a" backgroundColor="#feedec">
                      제안 거절
                    </RequestStatus>
                  );
                case 'expiration':
                  return (
                    <RequestStatus color="#263747" backgroundColor="#e9eaec">
                      기간 만료
                    </RequestStatus>
                  );
                case 'cancellation':
                  return (
                    <RequestStatus color="#263747" backgroundColor="#e9eaec">
                      제안 취소
                    </RequestStatus>
                  );
              }
            })()}
            <CreatedDate>
              {dayjs(createdTime).add(9, 'h').format('YY.MM.DD. A hh:mm')}
            </CreatedDate>
          </RequestStatusWrapper>
        </Contents>
      </ItemBody>
      <ItemFooter>
        {requestStatus === 'pending' && requestType === 'receive' && (
          <>
            <Button
              color="#3396f4"
              colorWithHover="#add5fa"
              onClick={() => handleSendResponse('approval')}
            >
              <CheckIcon />
              수락
            </Button>
            <Button
              color="#f5554a"
              colorWithHover="#f99992"
              onClick={() => handleSendResponse('rejection')}
            >
              <HighlightOffIcon />
              거절
            </Button>
          </>
        )}
        {requestStatus === 'pending' && requestType === 'send' && (
          <Button
            color="#f5554a"
            colorWithHover="#f99992"
            onClick={() => handleSendResponse('cancellation')}
          >
            <HighlightOffIcon />
            취소
          </Button>
        )}
        {requestStatus !== 'pending' && (
          <DeleteButton onClick={handleDeleteRequestItem}>
            <CloseIcon />
          </DeleteButton>
        )}
      </ItemFooter>
    </Item>
  );
};

const Item = styled.li<ItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  padding: 24px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  background-color: ${(props) =>
    props.requestStatus === 'expiration' ||
    props.requestStatus === 'cancellation' ||
    props.requestStatus === 'rejection'
      ? '#f3f3f3'
      : props.requestStatus === 'approval'
      ? '#ebf4fd'
      : ''};
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    align-items: flex-start;
    flex-direction: column;
  }
  @media (max-width: 575px) {
    padding: 16px;
  }
`;

const ImgWrapper = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const Img = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const Contents = styled.div`
  box-sizing: border-box;
`;

const Message = styled.h2`
  width: 100%;
  max-width: 360px;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 1.5;
  color: #263747;

  @media (max-width: 767px) {
    max-width: 100%;
    font-size: 15px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const InfoList = styled.h3`
  display: flex;
  margin-bottom: 10px;
`;

const RequestStatusWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const RequestStatus = styled.span<OfferStatusProps>`
  padding: 2px 10px;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.color};

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const NameLink = styled(Link)`
  font-size: 14px;
  color: #98a8b9;
  transition: all 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const InfoItem = styled.span`
  display: flex;
  font-size: 14px;
  color: #98a8b9;

  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: auto 8px;
    background-color: #98a8b9;
  }

  @media (max-width: 575px) {
    @media (max-width: 767px) {
      font-size: 13px;
    }

    &::before {
      height: 9px;
      margin: auto 6px;
    }
  }
`;

const ItemBody = styled.div`
  display: flex;
`;

const ItemFooter = styled.div`
  display: flex;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
  }
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.color};
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => props.color};
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: ${(props) => props.colorWithHover};
  }
  &:last-of-type {
    margin-left: 8px;
  }

  & svg {
    margin-right: 4px;
  }

  @media (max-width: 767px) {
    margin-top: 20px;
    width: 100%;
    height: 35px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const CreatedDate = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #98a8b9;

  @media (max-width: 575px) {
    margin-top: 10px;
    margin-left: 0;
    font-size: 13px;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid #f44336;
  background-color: transparent;
  color: #f44336;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #f99992;
  }

  @media (max-width: 767px) {
    margin-top: 20px;
    width: 100%;
    height: 30px;
  }
`;

export default RequestItem;
