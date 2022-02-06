import styled from '@emotion/styled';

interface NewPassWordCardSubHeadProps {
  step: number;
}

const subHeadTextData = [
  {
    step: 1,
    subHead:
      '비밀번호를 재설정 할 이메일을 입력하세요. 자세한 안내가 담긴 메일을 보내드리겠습니다.',
  },
  {
    step: 2,
    subHead: '이메일로 전송된 인증코드를 입력해주세요.',
  },
  {
    step: 3,
    subHead: '새로운 비밀번호를 입력해주세요.',
  },
];

const NewPassWordCardSubHead: React.FC<NewPassWordCardSubHeadProps> = ({
  step,
}) => {
  return (
    <SubHead>
      {subHeadTextData.find((data) => data.step === step)?.subHead}
    </SubHead>
  );
};

const SubHead = styled.h2`
  font-size: 16px;
  line-height: 1.6;
  color: #98a8b9;

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export default NewPassWordCardSubHead;
