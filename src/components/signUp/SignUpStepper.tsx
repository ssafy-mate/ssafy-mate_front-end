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
          <Step key={label} css={step}>
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

const step = css`
  .MuiStepIcon-root {
    color: #a3acb6;
  }
  .MuiStepIcon-text {
    color: #a3acb6;
  }
  .MuiStepLabel-label {
    color: #a3acb6;
  }
  .Mui-active {
    color: #3396f4;
  }
  .Mui-completed {
    color: #3396f4;
  }
`;

export default SignUpStepper;
