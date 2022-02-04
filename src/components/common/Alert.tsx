import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Alert, Snackbar } from '@mui/material';
import { alertState } from '../../types/authTypes';
import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

const SsafyMateAlert: React.FC<alertState> = ({ show, text, type }) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setAlertOpen(show);
  }, [show]);

  const alertClose = () => {
    setAlertOpen(false);
    dispatch(showSsafyMateAlert(false, '', 'info'));
  };

  return (
    <>
      {show === alertOpen && (
        <SignInSnackBar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={alertClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MuiAlert onClose={alertClose} severity={type} sx={{ width: '100%' }}>
            {text}
          </MuiAlert>
        </SignInSnackBar>
      )}
    </>
  );
};

const SignInSnackBar = styled(Snackbar)`
  height: 20%;
`;

const MuiAlert = styled(Alert)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

export default SsafyMateAlert;
