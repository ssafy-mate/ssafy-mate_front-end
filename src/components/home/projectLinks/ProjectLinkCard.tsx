import { useState, useEffect, Suspense, lazy } from 'react';

import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import type { ProjectTrack } from '../../../types/commonTypes';
import { ProjectLinkCardType } from '../../../types/commonTypes';

import useToken from '../../../hooks/reduxHooks/useToken';
import useProjectTrack from '../../../hooks/reduxHooks/useProjectTrack';

interface ProjectLinkCardProps extends ProjectLinkCardType {}

const ProjectTrackDialog = lazy(() => import('./ProjectTrackDialog'));

const ProjectLinkCard: React.FC<ProjectLinkCardProps> = ({
  projectId,
  project,
  pageUrl,
  smallImg,
  mediumImg,
  largeImg,
  hexColorCode,
  trackOptions,
}) => {
  const [openProjectTrackDialog, setOpenProjectTrackDialog] =
    useState<boolean>(false);
  const [openBlockDialog, setOpenBlockDialog] = useState<boolean>(false);
  const [openWarningAlert, setOpenWarningAlert] = useState<boolean>(false);
  const [selectedProjectTrack, setSelectedProjectTrack] =
    useState<ProjectTrack>('');

  const dispatch = useDispatch();
  const token = useToken();
  const projectTrack: string | null = useProjectTrack(projectId);

  useEffect(() => {
    if (token !== null && (projectTrack === null || projectTrack === '')) {
      setOpenProjectTrackDialog(true);
    }
  }, [token, projectTrack]);

  const handleClickCardItem = () => {
    if (token !== null) {
      projectTrack ? dispatch(push(pageUrl)) : setOpenProjectTrackDialog(true);
    } else {
      setOpenWarningAlert(true);
    }
  };

  const handleClose = (newSelectedProjectTrack?: ProjectTrack) => {
    setOpenProjectTrackDialog(false);

    if (newSelectedProjectTrack !== undefined) {
      setSelectedProjectTrack(newSelectedProjectTrack);
    }
  };

  const handleClickOpenBlockDialog = () => {
    token !== null ? setOpenBlockDialog(true) : setOpenWarningAlert(true);
  };

  const handleMouseEnterBlockDialog = () => {
    import('./ProjectTrackDialog');
  };

  const onCloseBlockDialog = () => {
    setOpenBlockDialog(false);
  };

  const onCloseWarningAlert = () => {
    setOpenWarningAlert(false);
  };

  return (
    <>
      <Card
        onClick={
          trackOptions !== undefined
            ? handleClickCardItem
            : handleClickOpenBlockDialog
        }
        onMouseEnter={handleMouseEnterBlockDialog}
        css={{ backgroundColor: hexColorCode }}
      >
        <CardImg
          srcSet={`
            ${smallImg.imgUrl} ${smallImg.width}w, 
            ${mediumImg.imgUrl} ${mediumImg.width}w,
            ${largeImg.imgUrl} ${largeImg.width}w,
          `}
          sizes="
            (max-width: 575px) 100px, 
            (max-width: 991px) 140px,
          "
          src={largeImg.imgUrl}
          alt={`${project} 이미지`}
        />
        <CardTitle>
          {project}
          <br />팀 빌딩 바로가기
        </CardTitle>
      </Card>
      <Suspense fallback={null}>
        {trackOptions !== undefined && openProjectTrackDialog && (
          <ProjectTrackDialog
            id="ringtone-menu"
            keepMounted
            open={openProjectTrackDialog}
            project={project}
            selectedProjectTrack={selectedProjectTrack}
            pageUrl={pageUrl}
            hexColorCode={hexColorCode}
            trackOptions={trackOptions}
            onClose={handleClose}
          />
        )}
      </Suspense>
      <Dialog
        open={openBlockDialog}
        onClose={onCloseBlockDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <BlockDialogTitle id="alert-dialog-title">
          해당 프로젝트 팀 빌딩 기간이 아닙니다.
        </BlockDialogTitle>
        <DialogContent>
          <BlockDialogContentText id="alert-dialog-description">
            해당 프로젝트 팀 빌딩 기간에 다시 한번 싸피 메이트를 이용해 주세요.
          </BlockDialogContentText>
        </DialogContent>
      </Dialog>
      {openWarningAlert && (
        <WarningAlertWrapper
          open={openWarningAlert}
          autoHideDuration={3000}
          onClose={onCloseWarningAlert}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <WarningAlert
            onClose={onCloseWarningAlert}
            severity="warning"
            sx={{ width: '100%' }}
          >
            로그인 후 이용해 주세요.
          </WarningAlert>
        </WarningAlertWrapper>
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
  height: 240px;
  margin: 0 auto 36px;

  @media (max-width: 991px) {
    width: 140px;
    height: 140px;
    margin: 0 0 0 12px;
  }
  @media (max-width: 575px) {
    width: 100px;
    height: 100px;
  }
`;

const CardTitle = styled.h3`
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

const WarningAlertWrapper = styled(Snackbar)`
  height: 20%;
`;

const WarningAlert = styled(Alert)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

export default ProjectLinkCard;
