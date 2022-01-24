import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ConstructionIcon from '@mui/icons-material/Construction';
import GitHubIcon from '@mui/icons-material/GitHub';

import Pagenation from './Pagenation';

const StudentAnnouncement: React.FC = () => {
  return (
    <Container>
      <AnnouncementHeader>
        <TotalCount>검색된 교육생 총 6명</TotalCount>
        <FilterSelect defaultValue={'recent'}>
          <option value="recent">최신순</option>
          <option value="headcount">희망 직무순</option>
        </FilterSelect>
      </AnnouncementHeader>
      <StudentList>
        <StudentItem>
          <ItemHeader>
            <ProfileImgWrapper>
              <ProfileImg
                src="/images/projects/sample-student_profile-img1.jpeg"
                alt="샘플 프로필 이미지"
              />
            </ProfileImgWrapper>
            <StudentInfo>
              <StudentName>
                <Link to="#">조원빈</Link>
              </StudentName>
              <SsafyInfo>서울</SsafyInfo>
              <SsafyInfo>전공자 (Java Track)</SsafyInfo>
            </StudentInfo>
          </ItemHeader>
          <ItemBody>
            <StudentDetailList>
              <StudentDetailItem>
                <DetailItemLabel>
                  <AssignmentTurnedInIcon />
                  선택 트랙
                </DetailItemLabel>
                <DetailItemContent>빅데이터</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkIcon />
                  희망 직무1
                </DetailItemLabel>
                <DetailItemContent>백엔드 (Back-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkOutlineIcon />
                  희망 직무2
                </DetailItemLabel>
                <DetailItemContent>프론트엔드 (Front-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <ConstructionIcon />
                  주요 기술
                </DetailItemLabel>
                <DetailItemContent>
                  Spring Boot, MySQL, Swagger, JPA, Docker
                </DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <GitHubIcon />
                  GitHub
                </DetailItemLabel>
                <DetailItemContent>
                  <GitHubLink
                    href="https://github.com/Jo-wonbin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/Jo-wonbin
                  </GitHubLink>
                </DetailItemContent>
              </StudentDetailItem>
            </StudentDetailList>
          </ItemBody>
          <ItemFooter>
            <RequestButton>팀 합류 요청</RequestButton>
            <Link to="#" css={profileLink}>
              프로필 보기
            </Link>
          </ItemFooter>
        </StudentItem>
        <StudentItem>
          <ItemHeader>
            <ProfileImgWrapper>
              <ProfileImg
                src="/images/projects/sample-student_profile-img2.jpeg"
                alt="샘플 프로필 이미지"
              />
            </ProfileImgWrapper>
            <StudentInfo>
              <StudentName>
                <Link to="/">소정은</Link>
              </StudentName>
              <SsafyInfo>서울</SsafyInfo>
              <SsafyInfo>전공자 (Java Track)</SsafyInfo>
            </StudentInfo>
          </ItemHeader>
          <ItemBody>
            <StudentDetailList>
              <StudentDetailItem>
                <DetailItemLabel>
                  <AssignmentTurnedInIcon />
                  선택 트랙
                </DetailItemLabel>
                <DetailItemContent>인공지능</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkIcon />
                  희망 직무1
                </DetailItemLabel>
                <DetailItemContent>프론트엔드 (Front-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkOutlineIcon />
                  희망 직무2
                </DetailItemLabel>
                <DetailItemContent>백엔드 (Back-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <ConstructionIcon />
                  주요 기술
                </DetailItemLabel>
                <DetailItemContent>
                  React, Redux, Redux-Saga, Emotion
                </DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <GitHubIcon />
                  GitHub
                </DetailItemLabel>
                <DetailItemContent>
                  <GitHubLink
                    href="https://github.com/sojjeong"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/sojjeong
                  </GitHubLink>
                </DetailItemContent>
              </StudentDetailItem>
            </StudentDetailList>
          </ItemBody>
          <ItemFooter>
            <RequestButton>팀 합류 요청</RequestButton>
            <Link to="#" css={profileLink}>
              프로필 보기
            </Link>
          </ItemFooter>
        </StudentItem>
        <StudentItem>
          <ItemHeader>
            <ProfileImgWrapper>
              <ProfileImg
                src="/images/projects/sample-student_profile-img3.jpeg"
                alt="샘플 프로필 이미지"
              />
            </ProfileImgWrapper>
            <StudentInfo>
              <StudentName>
                <Link to="/">손영배</Link>
              </StudentName>
              <SsafyInfo>서울</SsafyInfo>
              <SsafyInfo>비전공자 (Python Track)</SsafyInfo>
            </StudentInfo>
          </ItemHeader>
          <ItemBody>
            <StudentDetailList>
              <StudentDetailItem>
                <DetailItemLabel>
                  <AssignmentTurnedInIcon />
                  선택 트랙
                </DetailItemLabel>
                <DetailItemContent>블록체인</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkIcon />
                  희망 직무1
                </DetailItemLabel>
                <DetailItemContent>백엔드 (Back-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkOutlineIcon />
                  희망 직무2
                </DetailItemLabel>
                <DetailItemContent>프론트엔드 (Front-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <ConstructionIcon />
                  주요 기술
                </DetailItemLabel>
                <DetailItemContent>
                  django, MySQL, Spring Boot, Vue, Vuex
                </DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <GitHubIcon />
                  GitHub
                </DetailItemLabel>
                <DetailItemContent>
                  <GitHubLink
                    href="https://github.com/dudqo225"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/dudqo225
                  </GitHubLink>
                </DetailItemContent>
              </StudentDetailItem>
            </StudentDetailList>
          </ItemBody>
          <ItemFooter>
            <RequestButton>팀 합류 요청</RequestButton>
            <Link to="#" css={profileLink}>
              프로필 보기
            </Link>
          </ItemFooter>
        </StudentItem>
        <StudentItem>
          <ItemHeader>
            <ProfileImgWrapper>
              <ProfileImg
                src="/images/projects/sample-student_profile-img4.jpeg"
                alt="샘플 프로필 이미지"
              />
            </ProfileImgWrapper>
            <StudentInfo>
              <StudentName>
                <Link to="/">이정훈</Link>
              </StudentName>
              <SsafyInfo>서울</SsafyInfo>
              <SsafyInfo>전공자 (Java Track)</SsafyInfo>
            </StudentInfo>
          </ItemHeader>
          <ItemBody>
            <StudentDetailList>
              <StudentDetailItem>
                <DetailItemLabel>
                  <AssignmentTurnedInIcon />
                  선택 트랙
                </DetailItemLabel>
                <DetailItemContent>IoT 제어</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkIcon />
                  희망 직무1
                </DetailItemLabel>
                <DetailItemContent>백엔드 (Back-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkOutlineIcon />
                  희망 직무2
                </DetailItemLabel>
                <DetailItemContent>-</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <ConstructionIcon />
                  주요 기술
                </DetailItemLabel>
                <DetailItemContent>
                  Spring Boot, MySQL, AWS, JPA
                </DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <GitHubIcon />
                  GitHub
                </DetailItemLabel>
                <DetailItemContent>
                  <GitHubLink
                    href="https://github.com/person003333"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/person003333
                  </GitHubLink>
                </DetailItemContent>
              </StudentDetailItem>
            </StudentDetailList>
          </ItemBody>
          <ItemFooter>
            <RequestButton>팀 합류 요청</RequestButton>
            <Link to="#" css={profileLink}>
              프로필 보기
            </Link>
          </ItemFooter>
        </StudentItem>
        <StudentItem>
          <ItemHeader>
            <ProfileImgWrapper>
              <ProfileImg
                src="/images/projects/sample-student_profile-img5.jpeg"
                alt="샘플 프로필 이미지"
              />
            </ProfileImgWrapper>
            <StudentInfo>
              <StudentName>
                <Link to="/">박정환</Link>
              </StudentName>
              <SsafyInfo>서울</SsafyInfo>
              <SsafyInfo>전공자 (Java Track)</SsafyInfo>
            </StudentInfo>
          </ItemHeader>
          <ItemBody>
            <StudentDetailList>
              <StudentDetailItem>
                <DetailItemLabel>
                  <AssignmentTurnedInIcon />
                  선택 트랙
                </DetailItemLabel>
                <DetailItemContent>빅데이터</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkIcon />
                  희망 직무1
                </DetailItemLabel>
                <DetailItemContent>프론트엔드 (Front-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkOutlineIcon />
                  희망 직무2
                </DetailItemLabel>
                <DetailItemContent>-</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <ConstructionIcon />
                  주요 기술
                </DetailItemLabel>
                <DetailItemContent>
                  React, Redux, TypeScript, Sass
                </DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <GitHubIcon />
                  GitHub
                </DetailItemLabel>
                <DetailItemContent>
                  <GitHubLink
                    href="https://github.com/JeongHwan-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/JeongHwan-dev
                  </GitHubLink>
                </DetailItemContent>
              </StudentDetailItem>
            </StudentDetailList>
          </ItemBody>
          <ItemFooter>
            <RequestButton>팀 합류 요청</RequestButton>
            <Link to="#" css={profileLink}>
              프로필 보기
            </Link>
          </ItemFooter>
        </StudentItem>
        <StudentItem>
          <ItemHeader>
            <ProfileImgWrapper>
              <ProfileImg
                src="/images/projects/sample-student_profile-img6.jpeg"
                alt="샘플 프로필 이미지"
              />
            </ProfileImgWrapper>
            <StudentInfo>
              <StudentName>
                <Link to="/">이여진</Link>
              </StudentName>
              <SsafyInfo>서울</SsafyInfo>
              <SsafyInfo>전공자 (Java Track)</SsafyInfo>
            </StudentInfo>
          </ItemHeader>
          <ItemBody>
            <StudentDetailList>
              <StudentDetailItem>
                <DetailItemLabel>
                  <AssignmentTurnedInIcon />
                  선택 트랙
                </DetailItemLabel>
                <DetailItemContent>인공지능</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkIcon />
                  희망 직무1
                </DetailItemLabel>
                <DetailItemContent>프론트엔드 (Front-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <WorkOutlineIcon />
                  희망 직무2
                </DetailItemLabel>
                <DetailItemContent>백엔드 (Back-end)</DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <ConstructionIcon />
                  주요 기술
                </DetailItemLabel>
                <DetailItemContent>
                  React, Redux, Sass, Webpack
                </DetailItemContent>
              </StudentDetailItem>
              <StudentDetailItem>
                <DetailItemLabel>
                  <GitHubIcon />
                  GitHub
                </DetailItemLabel>
                <DetailItemContent>
                  <GitHubLink
                    href="https://github.com/orgs/ssafy-mate/people/limejin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/orgs/ssafy-mate/people/limejin
                  </GitHubLink>
                </DetailItemContent>
              </StudentDetailItem>
            </StudentDetailList>
          </ItemBody>
          <ItemFooter>
            <RequestButton>팀 합류 요청</RequestButton>
            <Link to="#" css={profileLink}>
              프로필 보기
            </Link>
          </ItemFooter>
        </StudentItem>
      </StudentList>
      <Pagenation />
    </Container>
  );
};

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const AnnouncementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TotalCount = styled.h6`
  margin: auto 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #263747;
`;

const FilterSelect = styled.select`
  padding: 0.3125rem 2rem 0.3125rem 1rem;
  border-color: #e9ecf3;
  border-radius: 4px;
  background-position: calc(100% - 0.6rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #e9ecf3;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #263747;
  appearance: none;
  transition: all 0.08s ease-in-out;
  cursor: pointer;
`;

const StudentList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const StudentItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 12px;
  padding: 16px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 1199px) {
    width: 47%;
    margin: 1%;
  }
  @media (max-width: 718px) {
    max-width: 100%;
    width: 100%;
    margin: 0 0 8px 0;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid #d7e2eb;
`;

const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 428px) {
    width: 46px;
    height: 46px;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 428px) {
    width: 46px;
    height: 46px;
  }
`;

const StudentInfo = styled.div`
  margin: auto 0;
`;

const StudentName = styled.h5`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  cursor: pointer;

  &:hover {
    color: #3396f4;
  }

  @media (max-width: 428px) {
    font-size: 15px;
  }
`;

const SsafyInfo = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: #5f7f90;

  &:first-of-type {
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 6px;
      background-color: #5f7f90;
    }
  }

  @media (max-width: 428px) {
    font-size: 13px;
  }
`;

const ItemBody = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const StudentDetailList = styled.ul`
  width: 100%;
`;

const StudentDetailItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 814px) {
    max-width: 302px;
  }
  @media (max-width: 718px) {
    width: 100%;
    max-width: 100%;
  }
`;

const DetailItemLabel = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 84px;
  padding: 6px 0;
  font-size: 14px;
  color: #5f7f90;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    margin-right: 4px;
    font-size: 18px;
    line-height: 1.5;
  }

  @media (max-width: 428px) {
    font-size: 13px;

    svg {
      font-size: 16px;
    }
  }
`;

const DetailItemContent = styled.p`
  overflow: hidden;
  width: 100%;
  padding: 6px 16px;
  font-size: 14px;
  color: #263747;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 428px) {
    font-size: 13px;
  }
`;

const GitHubLink = styled.a`
  text-decoration: underline;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RequestButton = styled.button`
  width: 100%;
  margin-right: 12px;
  padding: 7px 0;
  border: none;
  border-radius: 4px;
  background-color: #3396f4;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.08s ease-in-out;

  &:hover {
    background-color: #2878c3;
  }

  @media (max-width: 428px) {
    font-size: 13px;
  }
`;

const profileLink = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 7px 0;
  border-radius: 4px;
  background-color: #e9ecf3;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #263747;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #d1d4da;
  }

  @media (max-width: 428px) {
    font-size: 13px;
  }
`;

export default StudentAnnouncement;
