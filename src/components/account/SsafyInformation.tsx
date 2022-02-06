import { useState } from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { Avatar, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const SsafyInformation: React.FC = () => {
  const [previewProgileImg, setPreviewProfileImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

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

  const handleClearProfileImg = () => {
    setProfileImg(null);
    setPreviewProfileImg(null);
    //signUpFormData.delete('profileImg');
  };
  return (
    <>
      <SsafyInformationWrapper>
        <AvatarWrapperCol>
          <AvatarWrapper>
            {previewProgileImg ? (
              <>
                <SsafyMateAvatar src={previewProgileImg} />
                <FileInputWrapper>
                  <FileInputLabel htmlFor="profile-img">
                    <CloseIcon
                      fontSize="large"
                      onClick={handleClearProfileImg}
                    />
                  </FileInputLabel>
                </FileInputWrapper>
              </>
            ) : (
              <>
                <SsafyMateAvatar src="/broken-image.jpg" />
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
              </>
            )}
          </AvatarWrapper>
        </AvatarWrapperCol>

        <InfomationWrapper>
          <SingleInformationWrapper>
            <InformationLabel htmlFor="userName">이름</InformationLabel>
            <Information id="userName">이여진</Information>
          </SingleInformationWrapper>

          <SingleInformationWrapper>
            <InformationLabel htmlFor="userEmail">이메일</InformationLabel>
            <Information id="userEmail">sugarfina637@naver.com</Information>
          </SingleInformationWrapper>

          <SingleInformationWrapper>
            <InformationLabel htmlFor="ssafyCampus">
              SSAFY 캠퍼스
            </InformationLabel>
            <Information id="ssafyCampus">서울</Information>
          </SingleInformationWrapper>

          <SingleInformationWrapper>
            <InformationLabel className="necessary" htmlFor="ssafyTrack">
              교육 트랙
            </InformationLabel>
            <SelectWrapper>
              <Select
                id="ssafyTrack"
                defaultValue={'Java Track'}
                disabled={true}
              ></Select>
              <ModifyButton>수정</ModifyButton>
            </SelectWrapper>
          </SingleInformationWrapper>

          <SingleInformationWrapper>
            <InformationLabel htmlFor="studentNumber">학번</InformationLabel>
            <Information id="studentNumber">0643844</Information>
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
    color: #d8d4d1;
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

const SsafyMateAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  background-color: #abb7c6;

  @media (max-width: 575px) {
    width: 90px;
    height: 90px;
  }
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

export default SsafyInformation;
