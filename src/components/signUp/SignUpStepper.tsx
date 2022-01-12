import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const SignUpStepper: React.FC = () => {
  const steps = ['SSAFY 교육생 인증', '회원가입 정보 작성', '프로필 작성'];

  return (
    <Box sx={{ width: '100%' }} css={box}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const box = css`
  margin-bottom: 36px;
`;

export default SignUpStepper;
