/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface SignUpStepperProps {
  signUpStep: number;
}

const SignUpStepper: React.FC<SignUpStepperProps> = ({ signUpStep }) => {
  const labels = ['교육생 인증', '기본 정보 작성', '프로필 작성'];

  return (
    <Box sx={{ width: '100%' }} css={box}>
      <Stepper activeStep={signUpStep} alternativeLabel>
        {labels.map((label) => (
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

  .Mui-active {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    color: #3396f4;
  }
  .Mui-completed {
    color: #3396f4;
  }
`;

const step = css`
  .MuiStepLabel-label {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';

    @media (max-width: 575px) {
      font-size: 13px;
    }
    @media (max-width: 349px) {
      font-size: 12px;
    }
  }
`;

export default SignUpStepper;
