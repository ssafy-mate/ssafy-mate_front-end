import styled from '@emotion/styled';

interface WarningMessageProps {
  text: string;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ text }) => {
  return (
    <Wrapper>
      <Message>{text}</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const Message = styled.span`
  padding-left: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #f44336;
`;

export default WarningMessage;
