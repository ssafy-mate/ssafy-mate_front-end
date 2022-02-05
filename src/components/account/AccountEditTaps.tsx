import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material';

interface AccountEditTabsProps {
  setAcccountEditTap: (acccountEditTap: string) => void;
}
const AccountEditTaps: React.FC<AccountEditTabsProps> = ({
  setAcccountEditTap,
}) => {
  const [value, setValue] = React.useState<string>('ssafyInformation');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setAcccountEditTap(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AccountEditTabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <AccountEditTab value="ssafyInformation" label="기본 정보" />
        <AccountEditTab value="ssafyMateInformation" label="프로필 정보" />
      </AccountEditTabs>
    </Box>
  );
};

const AccountEditTabs = styled(Tabs)`
  width: 100%;
`;
const AccountEditTab = styled(Tab)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  width: 50%;
  @media (max-width: 575px) {
    font-size: 13px;
  }
  @media (max-width: 349px) {
    font-size: 12px;
  }
`;
export default AccountEditTaps;
