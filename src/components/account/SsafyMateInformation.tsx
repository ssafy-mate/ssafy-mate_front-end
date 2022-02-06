import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled';
import { TechStackWithImg } from '../../types/commonTypes';
import TechStackTagWithLevel from '../common/TechStackTagWithLevel';
import { useAutocomplete } from '@mui/material';
import useTechStackList from '../../hooks/useTechStackList';
import { TechStacksWithLevel } from '../../types/signUpTypes';
import { useState } from 'react';

const SsafyMateInformation: React.FC = () => {
  const [techStacks, setTechStacks] = useState<TechStacksWithLevel[]>([]);
  const techStackList: TechStackWithImg[] = useTechStackList();
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'search-tech-stack',
    multiple: true,
    options: techStackList,
    getOptionLabel: (option) => option.techStackName,
  });
  const updateTechStacks = (selectedTechStack: TechStacksWithLevel): void => {
    const updateTechStackIndex = techStacks.findIndex(
      (techStack) =>
        techStack.techStackCode === selectedTechStack.techStackCode,
    );

    const tempTechStacks = [...techStacks];

    tempTechStacks[updateTechStackIndex] = {
      techStackCode: selectedTechStack.techStackCode,
      techStackLevel: selectedTechStack.techStackLevel,
    };

    setTechStacks(tempTechStacks);
  };

  const deleteTechStacks = (seletedTechStackId: number): void => {
    const findStackIndex = techStacks.findIndex(
      (techStack) => techStack.techStackCode === seletedTechStackId,
    );

    const tempTechStacks = [...techStacks];

    if (findStackIndex >= 0) {
      tempTechStacks.splice(findStackIndex, 1);
    }

    setTechStacks(tempTechStacks);
  };

  const controlTechStacks = (selectedTechStackId: number) => {
    const findTeckStackId = techStacks.findIndex(
      (techStack) => techStack.techStackCode === selectedTechStackId,
    );

    if (findTeckStackId === -1) {
      setTechStacks([
        ...techStacks,
        {
          techStackCode: selectedTechStackId,
          techStackLevel: '중',
        },
      ]);
    } else {
      deleteTechStacks(selectedTechStackId);
    }
  };

  return (
    <>
      <SsafyMateInformationWrapper>
        <InfomationWrapper>
          <SingleInformationWrapper className="self-introduction">
            <InformationLabel htmlFor="self-introduction" className="necessary">
              자기소개
            </InformationLabel>
            <Textarea id="self-introduction" name="selfIntroduction" />
            <ModifyButton type="button">수정</ModifyButton>
          </SingleInformationWrapper>

          <Row>
            <JobSelectWrapper className="right-gap">
              <InformationLabel htmlFor="job1" className="necessary">
                희망 직무1
              </InformationLabel>
              <Select id="job1" defaultValue={'default'} name="job1"></Select>
            </JobSelectWrapper>

            <JobSelectWrapper className="right-gap">
              <InformationLabel htmlFor="job2">희망 직무2</InformationLabel>
              <Select id="job2" defaultValue={'default'} name="job2"></Select>
            </JobSelectWrapper>

            <JobSelectWrapper className="top-gap">
              <ModifyButton type="button">수정</ModifyButton>
            </JobSelectWrapper>
          </Row>

          <Row>
            <SingleInformationWrapper className="right-gap">
              <InformationLabel htmlFor="common" className="necessary">
                공통 프로젝트
              </InformationLabel>
              <Select id="common" defaultValue={'default'} name="job1"></Select>
            </SingleInformationWrapper>

            <SingleInformationWrapper className="right-gap">
              <InformationLabel htmlFor="special" className="necessary">
                특화 프로젝트
              </InformationLabel>
              <Select
                id="special"
                defaultValue={'default'}
                name="job2"
              ></Select>
            </SingleInformationWrapper>

            <SingleInformationWrapper className="top-gap-button">
              <ModifyButton type="button">수정</ModifyButton>
            </SingleInformationWrapper>
          </Row>

          <Row className="tech-stack-row">
            <SingleInformationWrapper
              {...getRootProps()}
              className="tech-stack-input"
            >
              <InformationLabel
                className="necessary"
                htmlFor="tech-stack-options"
                {...getInputLabelProps()}
              >
                기술 스택 <Em>(필수 2가지 이상 기입)</Em>
              </InformationLabel>
              <InfoInputWrapper
                ref={setAnchorEl}
                className={focused ? 'focused' : ''}
              >
                <InfoInput
                  type="text"
                  id="tech-stack-options"
                  name="tech-stack-options"
                  placeholder="ex) Vue.js, django, Spring Boot, MySQL"
                  {...getInputProps()}
                />
              </InfoInputWrapper>
              {groupedOptions.length > 0 ? (
                <SearchList {...getListboxProps()}>
                  {(groupedOptions as typeof techStackList).map(
                    (option, index) => (
                      <SearchItemWrapper
                        key={option.id}
                        onClick={() => {
                          controlTechStacks(option.id);
                        }}
                      >
                        <SearchItem {...getOptionProps({ option, index })}>
                          <TechStackInfo>
                            <TechStackImg
                              src={option.techStackImgUrl}
                              alt={option.techStackName}
                            />
                            {option.techStackName}
                          </TechStackInfo>
                          <CheckIcon fontSize="small" />
                        </SearchItem>
                      </SearchItemWrapper>
                    ),
                  )}
                </SearchList>
              ) : null}
            </SingleInformationWrapper>
            <TechStackList>
              {value.map((option: TechStackWithImg, index: number) => (
                <TechStackTagWithLevel
                  id={option.id}
                  techStackName={option.techStackName}
                  techStackImgUrl={option.techStackImgUrl}
                  techStacks={techStacks}
                  updateTechStacks={updateTechStacks}
                  deleteTechStacks={deleteTechStacks}
                  {...getTagProps({ index })}
                />
              ))}
            </TechStackList>

            <ModifyButton type="button">수정</ModifyButton>
          </Row>

          <Row>
            <SingleInformationWrapper className="top-gap">
              <InformationLabel htmlFor="github-url">
                GitHub URL <Em>(선택)</Em>
              </InformationLabel>
              <InfoInput
                type="url"
                id="github-url"
                name="githubUrl"
                placeholder="https://github.com/ssafy-mate"
                pattern="https://.*"
              />
            </SingleInformationWrapper>
          </Row>
          <Row>
            <SingleInformationWrapper>
              <InformationLabel htmlFor="etc-url">
                기술 블로그 URL 또는 기타 URL <Em>(선택)</Em>
              </InformationLabel>
              <InfoInput
                type="url"
                id="etc-url"
                name="etcUrl"
                placeholder="https://velog.io/@ssafy-mate"
                pattern="https://.*"
              />
            </SingleInformationWrapper>
          </Row>
          <SingleInformationWrapper>
            <ModifyButton type="button">수정</ModifyButton>
          </SingleInformationWrapper>
        </InfomationWrapper>
      </SsafyMateInformationWrapper>
    </>
  );
};
const TechStackInfo = styled.div`
  display: flex;
  align-items: center;
`;
const TechStackImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  border-radius: 2px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 18px;
    height: 18px;
  }
`;
const TechStackList = styled.ul``;
const SearchItemWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  outline: 0;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  line-height: 24px;
  color: #5f7f90;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #eaf4fd;
  }

  & svg {
    color: transparent;
  }

  &[aria-selected='true'] {
    background-color: #eaf4fd;

    & svg {
      color: #3396f4;
    }
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;
const SearchList = styled.ul`
  overflow-y: scroll;
  position: absolute;
  top: 62px;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  background-color: #fff;
`;

const InfoInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  outline: 0;
  border-radius: 0.25rem;
  background-color: #fbfbfd;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;

  &.have-error {
    margin-bottom: 4px;
    border-radius: 0.25rem;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const InfoInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;

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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const Row = styled.div`
  display: flex;

  &:first-of-type {
    margin-bottom: 12px;
  }

  &.tech-stack-row {
    flex-direction: column;
  }

  @media (max-width: 575px) {
    flex-direction: column;

    &:nth-of-type(2) {
      flex-direction: column;
    }

    &.tech-stack-row {
      margin-top: 16px;
    }
  }
`;
const Em = styled.em`
  font-size: 13px;
  color: #3396f4;
`;
const SsafyMateInformationWrapper = styled.div``;

const InfomationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SingleInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &.right-gap {
    width: 43%;
    margin-right: 12px;
  }

  &.top-gap-button {
    width: 13%;
    margin-top: 25px;
  }

  &.top-gap {
    margin-top: 16px;
  }

  &.tech-stack-input {
    position: relative;
  }

  &.self-introduction {
    margin-top: 32px;
  }

  @media (max-width: 575px) {
    &.right-gap {
      margin-top: 16px;
      margin-right: 0px;
      width: 100%;
    }

    &.top-gap-button {
      margin-top: 16px;
      width: 100%;
    }
  }
`;

const JobSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;

  &.right-gap {
    width: 43%;
    margin-right: 12px;
  }

  &.top-gap {
    width: 13%;
    margin-top: 41px;
  }

  @media (max-width: 575px) {
    &.right-gap {
      width: 100%;
    }

    &.top-gap {
      margin-top: 16px;
      width: 100%;
    }
  }
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

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;

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
  width: 100%;
  height: 40px;
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

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const Select = styled.select`
  width: 100%;
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
    background-color: #f7f8fa;
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
    margin-bottom: 0px;
  }
`;

export default SsafyMateInformation;
