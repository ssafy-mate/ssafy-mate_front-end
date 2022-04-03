import { useState, useEffect, useRef, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import type { ProjectTrack } from '../../../types/commonTypes';

import { showSsafyMateAlert } from '../../../redux/modules/alert';
import { selectProjectTrack as selectProjectTrackSagaStart } from '../../../redux/modules/auth';

interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  project: string;
  selectedProjectTrack: ProjectTrack;
  pageUrl: string;
  hexColorCode: string;
  trackOptions?: string[];
  onClose: (value?: string) => void;
}

interface DialogButtonProps {
  fontcolor: string;
}

interface ProjectTrackTitleProps {
  hexcolorcode: string;
}

interface OptionLabelProps {
  hexcolorcode: string;
}

interface ProjectTrackRequestType {
  project: string;
  projectTrack: string;
}

const ProjectTrackDialog: React.FC<ConfirmationDialogRawProps> = ({
  open,
  project,
  selectedProjectTrack: selectedProjectTrackProp,
  pageUrl,
  hexColorCode,
  trackOptions,
  onClose,
  ...other
}) => {
  const [projectTrack, setProjectTrack] = useState(selectedProjectTrackProp);
  const radioGroupRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      setProjectTrack(selectedProjectTrackProp);
    }
  }, [selectedProjectTrackProp, open]);

  const selectProjectTrack = useCallback(
    (project: ProjectTrackRequestType) => {
      dispatch(selectProjectTrackSagaStart(project));
    },
    [dispatch],
  );

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleDialogButtonClick = () => {
    if (projectTrack === null && projectTrack === '') {
      dispatch(
        showSsafyMateAlert({
          show: true,
          text: '프로젝트 트랙을 선택해주세요.',
          type: 'warning',
        }),
      );

      return;
    }

    selectProjectTrack({
      project,
      projectTrack,
    });

    onClose(projectTrack);
  };

  const handleProjectTrackRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectTrack((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <ProjectTrackTitle hexcolorcode={hexColorCode}>
        {project} 트랙 선택
      </ProjectTrackTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="project-track"
          name="project-track"
          value={projectTrack}
          onChange={handleProjectTrackRadioGroupChange}
        >
          {trackOptions?.map((trackOption) => (
            <OptionLabel
              key={trackOption}
              value={trackOption}
              control={<Radio />}
              label={trackOption}
              hexcolorcode={hexColorCode}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <DialogButton
          onClick={handleDialogButtonClick}
          fontcolor={hexColorCode}
          disabled={projectTrack === null || projectTrack === '' ? true : false}
        >
          확인
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};

const ProjectTrackTitle = styled(DialogTitle)<ProjectTrackTitleProps>`
  background-color: ${(props) => props.hexcolorcode};
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 18px;
  color: #fff;

  @media (max-width: 575px) {
    font-size: 16px;
  }
`;

const OptionLabel = styled(FormControlLabel)<OptionLabelProps>`
  span {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 16px;
    color: #263747;
    transition: color 0.08s ease-in-out;

    @media (max-width: 575px) {
      font-size: 14px;
    }

    &:hover {
      color: ${(props) => props.hexcolorcode};
    }
  }
`;

const DialogButton = styled(Button)<DialogButtonProps>`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: ${(props) => props.fontcolor};
`;

export default ProjectTrackDialog;
