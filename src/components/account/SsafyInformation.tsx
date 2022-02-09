import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { editProfileInfo as editProfileInfoSagaStart } from '../../redux/modules/profile';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import { Link } from 'react-router-dom';

import history from '../../history';

import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import useProfileInfo from '../../hooks/useProfileInfo';
import useUserId from '../../hooks/useUserId';
import useToken from '../../hooks/useToken';
import { UserData } from '../../hooks/useUserInfo';

import { EditProfileInfoRequest, RootState } from '../../types/authTypes';
import { Severity, SsafyTrack } from '../../types/signUpTypes';

import { campusListData } from '../../data/ssafyData';

const SsafyInformation: React.FC = () => {
  const dispatch = useDispatch();
  const profileInfo: UserData | null = useProfileInfo();
  const token: string | null = useToken();
  const userId: number | null = useUserId();
  const [profileImg, setProfileImg] = useState(null);
  const [previewProgileImg, setPreviewProfileImg] = useState<string | null>('');
  const studentNumber = useSelector<RootState, string | null>(
    (state) => state.auth.studentNumber,
  );
  const [newSsafyTrack, setNewSsafyTrack] = useState<string>('');
  const [selectedTracks, setSelectedTracks] = useState<SsafyTrack[]>([]);
  const [ssafyTrackDisabled, setSsafyTrackDisabled] = useState<boolean>(true);
  const [ssafyTrackModifyButtonText, setSsafyTrackModifyButtonText] =
    useState<string>('수정');

  const showAlert = (
    alertShow: boolean,
    alertText: string,
    alertType: Severity,
  ) => {
    dispatch(
      showSsafyMateAlert({
        show: alertShow,
        text: alertText,
        type: alertType,
      }),
    );
  };

  useEffect(() => {
    if (profileInfo !== null) {
      setNewSsafyTrack(profileInfo?.ssafyTrack);
      setPreviewProfileImg(profileInfo?.profileImgUrl);
    } else {
      showAlert(true, '로그인 후 이용해주시기 바랍니다.', 'info');
      history.push('/');
    }
  }, [profileInfo]);

  useEffect(() => {
    const selectedCampusIndex = campusListData.findIndex(
      (campus) => campus.area === profileInfo?.campus,
    );

    if (selectedCampusIndex > -1) {
      setSelectedTracks(campusListData[selectedCampusIndex].ssafyTracks);
    }
  }, [profileInfo?.campus]);

  useEffect(() => {
    if (profileImg !== null) {
      newProfileInfo('profileImg');
    }
  }, [profileImg]);

  const updateProfileAndAuth = useCallback(
    (requestData: EditProfileInfoRequest) => {
      dispatch(editProfileInfoSagaStart(requestData));
    },
    [dispatch],
  );

  const handleChangeProfileImg = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files },
    }: any = event;
    const theImgFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      setPreviewProfileImg(result);
    };

    reader.readAsDataURL(theImgFile);
    setProfileImg(theImgFile);
  };

  const EditProfileImage = (): FormData => {
    const EditProfileFormData = new FormData();

    if (profileImg !== null) {
      EditProfileFormData.append('profileImg', profileImg);
    }

    return EditProfileFormData;
  };

  const EditSsafyTrack = (): FormData => {
    const EditSsafyTrackFormData = new FormData();
    EditSsafyTrackFormData.append('ssafyTrack', newSsafyTrack);

    return EditSsafyTrackFormData;
  };

  const handleSsafyTrack = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSsafyTrack(event.target.value);
  };

  const handleSsafyModifyButton = (event: React.MouseEvent) => {
    if (ssafyTrackModifyButtonText === '수정') {
      setSsafyTrackDisabled(false);
      setSsafyTrackModifyButtonText('확인');
    } else {
      newProfileInfo('ssafyTrack');
      setSsafyTrackDisabled(true);
      setSsafyTrackModifyButtonText('수정');
    }
  };

  const newProfileInfo = (profileInfoSelected: string) => {
    switch (profileInfoSelected) {
      case 'profileImg':
        if (profileImg !== profileInfo?.profileImgUrl) {
          const RequestFormData: FormData = EditProfileImage();

          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileAndAuth({
              data: RequestFormData,
              token: token,
              userId: userId,
              profileInfo: 'profile-img',
            });
          }
        }
        break;
      case 'ssafyTrack':
        if (profileInfo?.ssafyTrack !== newSsafyTrack) {
          const RequestFormData: FormData = EditSsafyTrack();
          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileAndAuth({
              data: RequestFormData,
              token: token,
              userId: userId,
              profileInfo: 'ssafy-track',
            });
          }
        }
        break;
    }
  };

  return (
    <>
      <SsafyInformationWrapper>
        <AvatarWrapperCol>
          <AvatarWrapper>
            <SsafyMateAvatar
              src={
                previewProgileImg === null
                  ? '/broken-image.jpg'
                  : previewProgileImg
              }
            />
            <FileInputWrapper>
              <FileInputLabel htmlFor="profile-img">
                <AddAPhotoIcon />
              </FileInputLabel>
              <FileInput
                type="file"
                id="profile-img"
                accept="image/*"
                onChange={handleChangeProfileImg}
              />
            </FileInputWrapper>
          </AvatarWrapper>
        </AvatarWrapperCol>
        <InfomationWrapper>
          <SingleInformationWrapper>
            <InformationLabel htmlFor="userName">이름</InformationLabel>
            <Information id="userName">{profileInfo?.userName}</Information>
          </SingleInformationWrapper>
          <SingleInformationWrapper>
            <InformationLabel htmlFor="userEmail">이메일</InformationLabel>
            <Information id="userEmail">{profileInfo?.userEmail}</Information>
          </SingleInformationWrapper>
          <SingleInformationWrapper>
            <InformationLabel htmlFor="ssafyCampus">
              SSAFY 캠퍼스
            </InformationLabel>
            <Information id="ssafyCampus">서울</Information>
          </SingleInformationWrapper>
          <SingleInformationWrapper>
            <InformationLabel htmlFor="studentNumber">학번</InformationLabel>
            <Information id="studentNumber">{studentNumber}</Information>
          </SingleInformationWrapper>
          <SingleInformationWrapper>
            <InformationLabel className="necessary" htmlFor="ssafyTrack">
              교육 트랙
            </InformationLabel>
            <SelectWrapper>
              <Select
                id="ssafyTrack"
                value={newSsafyTrack}
                onChange={handleSsafyTrack}
                disabled={ssafyTrackDisabled}
              >
                {selectedTracks.map((track: SsafyTrack) => (
                  <option key={track.id} value={track.name}>
                    {track.name}
                  </option>
                ))}
              </Select>
              <ModifyButton onClick={handleSsafyModifyButton}>
                {ssafyTrackModifyButtonText}
              </ModifyButton>
            </SelectWrapper>
          </SingleInformationWrapper>
          <SingleInformationWrapper>
            <NewPasswordLinkButton to="/users/password/new">
              비밀번호 재설정 하러가기
            </NewPasswordLinkButton>
          </SingleInformationWrapper>
        </InfomationWrapper>
      </SsafyInformationWrapper>
    </>
  );
};

const SsafyInformationWrapper = styled.div``;

const AvatarWrapperCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  @media (max-width: 575px) {
    &:nth-of-type(2) {
      flex-direction: column;
    }
  }
`;

const AvatarWrapper = styled.div`
  margin: auto 32px;

  @media (max-width: 575px) {
    margin: auto 16px auto 0;
  }
`;

const SsafyMateAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  background-color: #abb7c6;

  @media (max-width: 575px) {
    width: 90px;
    height: 90px;
  }
`;

const FileInputWrapper = styled.div`
  text-align: right;
`;

const FileInputLabel = styled.label`
  position: relative;
  top: -22px;
  right: 6px;
  z-index: 10;
  color: #3396f4;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const InfomationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SingleInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InformationLabel = styled.label`
  margin-bottom: 4px;
  padding-left: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  &.necessary {
    &::before {
      content: '*';
      display: inline-block;
      vertical-align: top;
      margin: 0 0.125rem 0 0;
      -webkit-font-smoothing: antialiased;
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.25rem;
      color: #f44336;
    }
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const Information = styled.div`
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #e8f0fe;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  width: 87%;
  height: 40px;
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-position: calc(100% - 0.8rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;
  appearance: none;

  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px#3396f4;
  }

  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }

  &:disabled {
    border: 1px solid #d7e2eb;
    box-shadow: none;
    background-color: #e8f0fe;

    cursor: not-allowed;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ModifyButton = styled.button`
  width: 13%;
  height: 40px;
  margin-left: 5px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
  transition: background-color 0.08s ease-in-out;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }
`;
const NewPasswordLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 8px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }
  &:disabled {
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export default SsafyInformation;
