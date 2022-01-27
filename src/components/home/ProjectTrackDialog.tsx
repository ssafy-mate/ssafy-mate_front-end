import { useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import type { ProjectTrack } from '../../types/commonTypes';

interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  projectName: string;
  selectedProjectTrack: ProjectTrack;
  pageUrl: string;
  hexColorCode: string;
  trackOptions?: string[];
  onClose: (value?: string) => void;
}

interface DialogButtonProps {
  fontColor: string;
}

interface ProjectTrackTitleProps {
  hexColorCode: string;
}

interface OptionLabelProps {
  hexColorCode: string;
}

const ProjectTrackDialog: React.FC<ConfirmationDialogRawProps> = ({
  open,
  projectName,
  selectedProjectTrack: selectedProjectTrackProp,
  pageUrl,
  hexColorCode,
  trackOptions,
  onClose,
  ...other
}) => {
  const [selectedProjectTrack, setSelectedProjectTrack] = useState(
    selectedProjectTrackProp,
  );
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setSelectedProjectTrack(selectedProjectTrackProp);
    }
  }, [selectedProjectTrackProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(selectedProjectTrack);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProjectTrack((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <ProjectTrackTitle hexColorCode={hexColorCode}>
        {projectName} 트랙 선택
      </ProjectTrackTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={selectedProjectTrack}
          onChange={handleChange}
        >
          {trackOptions?.map((trackOption) => (
            <OptionLabel
              key={trackOption}
              value={trackOption}
              control={<Radio />}
              label={trackOption}
              hexColorCode={hexColorCode}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <DialogButton autoFocus onClick={handleCancel} fontColor={'#44576c'}>
          취소
        </DialogButton>
        <DialogButton onClick={handleOk} fontColor={hexColorCode}>
          확인
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};

const ProjectTrackTitle = styled(DialogTitle)<ProjectTrackTitleProps>`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 18px;
  color: #fff;
  background-color: ${(props) => props.hexColorCode};

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
      color: ${(props) => props.hexColorCode};
    }
  }
`;

const DialogButton = styled(Button)<DialogButtonProps>`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: ${(props) => props.fontColor};
`;

export default ProjectTrackDialog;
