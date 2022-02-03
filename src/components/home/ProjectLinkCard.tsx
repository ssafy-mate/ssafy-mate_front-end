import { useState } from 'react';

import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import type { ProjectTrack } from '../../types/commonTypes';
import { ProjectLinkCardProps } from '../../types/commonTypes';

import useProjectTrack from '../../hooks/useProjectTrack';

import ProjectTrackDialog from './ProjectTrackDialog';

const ProjectLinkCard: React.FC<ProjectLinkCardProps> = ({
  projectId,
  projectName,
  pageUrl,
  imgUrl,
  hexColorCode,
  trackOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [selectedProjectTrack, setSelectedProjectTrack] =
    useState<ProjectTrack>('');
  const projectTrack: string | null = useProjectTrack(projectId);
  const dispatch = useDispatch();

  const handleClickCardItem = () => {
    projectTrack ? dispatch(push(pageUrl)) : setOpen(true);
  };

  const handleClose = (newSelectedProjectTrack?: ProjectTrack) => {
    setOpen(false);

    if (newSelectedProjectTrack) {
      setSelectedProjectTrack(newSelectedProjectTrack);
    }
  };

  const handleClickOpenBlockDialog = () => {
    setOpenBlockDialog(true);
  };

  const handleCloseBlockDialog = () => {
    setOpenBlockDialog(false);
  };

  return (
    <>
      {trackOptions ? (
        <>
          <Card
            onClick={handleClickCardItem}
            css={{ backgroundColor: hexColorCode }}
          >
            <CardImg src={imgUrl} alt={`${projectName} 이미지`} />
            <CardTitle>
              {projectName}
              <br />팀 빌딩 바로가기
            </CardTitle>
          </Card>
          <ProjectTrackDialog
            id="ringtone-menu"
            keepMounted
            open={open}
            projectName={projectName}
            selectedProjectTrack={selectedProjectTrack}
            pageUrl={pageUrl}
            hexColorCode={hexColorCode}
            trackOptions={trackOptions}
            onClose={handleClose}
          />
        </>
      ) : (
        <>
          <Card
            onClick={handleClickOpenBlockDialog}
            css={{ backgroundColor: hexColorCode }}
          >
            <CardImg src={imgUrl} alt={`${projectName} 이미지`} />
            <CardTitle>
              {projectName}
              <br />팀 빌딩 바로가기
            </CardTitle>
          </Card>
          <Dialog
            open={openBlockDialog}
            onClose={handleCloseBlockDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <BlockDialogTitle id="alert-dialog-title">
              해당 프로젝트 팀 빌딩 기간이 아닙니다.
            </BlockDialogTitle>
            <DialogContent>
              <BlockDialogContentText id="alert-dialog-description">
                해당 프로젝트 팀 빌딩 기간에 다시 한번 싸피 메이트를 이용해
                주세요.
              </BlockDialogContentText>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

const Card = styled.div`
  width: 320px;
  padding: 24px 16px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 10%);
  color: #fff;
  transition: box-shadow 0.26s ease, transform 0.26s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 26%);
    transform: translateY(-8px);
  }

  @media (max-width: 1199px) {
    width: 300px;
  }
  @media (max-width: 991px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 18px;
  }
`;

const CardImg = styled.img`
  display: block;
  width: 240px;
  margin: 0 auto 36px;

  @media (max-width: 991px) {
    width: 140px;
    margin: 0 0 0 12px;
  }
  @media (max-width: 575px) {
    width: 100px;
  }
`;

const CardTitle = styled.p`
  padding-left: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.6;

  @media (max-width: 991px) {
    margin: auto 0;
    padding-left: 0;
  }
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;

const BlockDialogTitle = styled(DialogTitle)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 18px;

  @media (max-width: 575px) {
    font-size: 16px;
  }
`;

const BlockDialogContentText = styled(DialogContentText)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;

  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

export default ProjectLinkCard;
