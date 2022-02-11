import styled from '@emotion/styled';

const PRIVACY_CONTENTS = [
  {
    id: 1,
    content: '제1조 [개인정보의 처리 목적]',
  },
  {
    id: 2,
    content: '제2조 [개인정보의 처리 및 보유 기간]',
  },
  {
    id: 3,
    content: '제3조 [정보 주체의 권리, 의무 및 행사방법]',
  },
  {
    id: 4,
    content: '제4조 [처리하는 개인정보 항목]',
  },
  {
    id: 5,
    content: '제5조 [개인정보의 파기]',
  },
  {
    id: 6,
    content: '제6조 [개인정보의 안전성 확보 조치]',
  },
];

const PRIVACY_CONTENTS_STORE_EXPIRED_CONDITIONS = [
  {
    id: 1,
    condition:
      '온라인/모바일 서비스 제공을 위해 수집한 회원가입 정보: 회원가입 3년 후까지',
  },
  {
    id: 2,
    condition:
      '홈페이지 회원가입 및 관리와 관련한 개인정보는 수집.이용에 관한 동의일로부터 3년 후까지 위 이용목적을 위하여 보유.이용됩니다.',
  },
  {
    id: 3,
    condition: '보유근거 : 회원정보를 통한 서비스 제공',
  },
  {
    id: 4,
    condition: '관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 (3년)',
  },
];

const PRIVACY_STORE_CONTENTS = [
  {
    id: 1,
    content: '홈페이지 회원가입 및 관리',
  },
  {
    id: 2,
    content:
      '필수항목 : 이메일, 비밀번호, 이름, 자기소개, 희망 직무1, SSAFY 교육생 정보, 서비스 이용 기록, 쿠키',
  },
  {
    id: 3,
    content:
      '선택항목 : 희망 직무2, 공통 프로젝트, 특화 프로젝트, 프로필 이미지, SNS url',
  },
];

const PrivacySection: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Head>싸피메이트 개인정보 처리 방침</Head>
        <PrivacyPreDescriptionWrapper>
          <DescriptionList>
            <DescriptionItem>
              [SSAFYMATE]('https://ssafymate.site'이하 '싸피메이트')은(는)
              「개인정보 보호법」 제30조에 따라 이용자의 개인정보를 보호하고
              이와 관련된 고충을 신속하고 원활하게 처리할 수 있게 하도록 아래와
              같이 개인정보 처리 방침을 명시하며, 이용자의 권익 보호에 최선을
              다할 것입니다.
            </DescriptionItem>
            <DescriptionItem>
              본 개인정보 처리 방침은 '싸피메이트'의 개인 이용약관 및 기업
              이용약관 제2조에 정의된 “서비스”에 적용되며 아래의 내용을
              포함합니다.
            </DescriptionItem>
          </DescriptionList>

          <PrivacyContentsList>
            {PRIVACY_CONTENTS.map((contentItem) => (
              <PrivacyContentsItem key={contentItem.id}>
                {contentItem.content}
              </PrivacyContentsItem>
            ))}
          </PrivacyContentsList>
        </PrivacyPreDescriptionWrapper>
        <PrivacyList>
          <PrivacyItem>
            <SubHead>제1조 [개인정보의 처리 목적]</SubHead>
            <DescriptionList>
              <DescriptionItem>
                싸피메이트는 필요한 한도 내에서 최소한의 개인정보를 수집하며,
                수집한 개인정보는 다음의 목적을 위해 활용합니다.
              </DescriptionItem>
            </DescriptionList>
            <DescriptionDetailList>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  1. 홈페이지 회원가입 및 관리
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  회원제 서비스 이용에 따른 본인 확인 및 회원 가입 의사 확인,
                  회원 자격 유지, 회원 자격 관리, 서비스 부정 이용 및 비인가
                  사용 방지 등을 목적으로 개인정보를 처리합니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  2. 재화 또는 서비스 제공
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증을
                  목적으로 개인정보를 처리합니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
            </DescriptionDetailList>
          </PrivacyItem>
          <PrivacyItem>
            <SubHead>제2조 [개인정보의 처리 및 보유 기간]</SubHead>
            <DescriptionList>
              <DescriptionItem>
                싸피메이트는 법령에 따른 개인정보 보유·이용기간 또는
                정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </DescriptionItem>
              <DescriptionItem>
                개인정보 처리 및 보유 기간은 다음과 같습니다.
              </DescriptionItem>
            </DescriptionList>
            <PrivacyContentsList>
              {PRIVACY_CONTENTS_STORE_EXPIRED_CONDITIONS.map((contentItem) => (
                <PrivacyContentsItem key={contentItem.id}>
                  {contentItem.condition}
                </PrivacyContentsItem>
              ))}
            </PrivacyContentsList>
          </PrivacyItem>
          <PrivacyItem>
            <SubHead>제3조 [정보 주체의 권리, 의무 및 행사방법]</SubHead>
            <DescriptionDetailList>
              <DescriptionDetailItem>
                1. 정보주체는 싸피메이트에 대해 언제든지 개인정보
                열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                2. 제1항에 따른 권리 행사는 싸피메이트에 대해 「개인정보
                보호법」 시행령 제41조 제1항에 따라 서면, 전자우편,
                모사전송(FAX) 등을 통하여 하실 수 있으며 싸피메이트는 이에 대해
                지체 없이 조치하겠습니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을
                받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보
                처리 방법에 관한 고시 별지 제11호 서식에 따른 위임장을 제출
                하셔야 합니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                4. 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조
                제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수
                있습니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                5. 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가
                수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수
                없습니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                6. 싸피메이트는 정보주체 권리에 따른 열람의 요구, 정정·삭제의
                요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나
                정당한 대리인인지를 확인합니다.
              </DescriptionDetailItem>
            </DescriptionDetailList>
          </PrivacyItem>
          <PrivacyItem>
            <SubHead>제4조 [처리하는 개인정보 항목]</SubHead>
            <DescriptionList>
              <DescriptionItem>
                싸피메이트는 다음의 개인정보 항목을 처리하고 있습니다.
              </DescriptionItem>
            </DescriptionList>
            <PrivacyContentsList>
              {PRIVACY_STORE_CONTENTS.map((contentItem) => (
                <PrivacyContentsItem key={contentItem.id}>
                  {contentItem.content}
                </PrivacyContentsItem>
              ))}
            </PrivacyContentsList>
          </PrivacyItem>
          <PrivacyItem>
            <SubHead>제5조 [개인정보의 파기]</SubHead>
            <DescriptionList>
              <DescriptionItem>
                싸피메이트는 개인정보 보유기간의 경과, 처리목적 달성 등
                개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                파기합니다. 정보주체로부터 동의받은 개인정보 보유기간이
                경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라
                개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
                데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              </DescriptionItem>
              <DescriptionItem>
                보존하는 개인정보 항목 : 이메일, 학번, 이름 등
              </DescriptionItem>
              <DescriptionItem>
                개인정보 파기의 절차 및 방법은 다음과 같습니다.
              </DescriptionItem>
            </DescriptionList>
            <DescriptionDetailList>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  1. 파기절차
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  싸피메이트는 파기 사유가 발생한 개인정보를 선정하고
                  파기합니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  2. 파기방법
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                  사용합니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
            </DescriptionDetailList>
          </PrivacyItem>
          <PrivacyItem>
            <SubHead>제6조 [개인정보의 안전성 확보 조치]</SubHead>
            <DescriptionList>
              <DescriptionItem>
                싸피메이트 개인정보의 안전성 확보를 위해 다음과 같은 조치를
                취하고 있습니다.
              </DescriptionItem>
            </DescriptionList>
            <DescriptionDetailList>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  1. 개인정보의 암호화
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고
                  있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                  데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도
                  보안기능을 사용하고 있습니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  2. 접속기록의 보관 및 위변조 방지
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관,
                  관리하고 있으며,다만, 5만명 이상의 정보주체에 관하여
                  개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는
                  경우에는 2년이상 보관, 관리하고 있습니다.
                </DescriptionDetailItem>
                <DescriptionDetailItem>
                  또한, 접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을
                  사용하고 있습니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
              <DescriptionDetailItemWrapper>
                <DescriptionDetailItemHead>
                  3. 개인정보에 대한 접근 제한
                </DescriptionDetailItemHead>
                <DescriptionDetailItem>
                  개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
                  부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여
                  필요한 조치를 하고 있으며 침입차단시스템을 이용하여
                  외부로부터의 무단 접근을 통제하고 있습니다.
                </DescriptionDetailItem>
              </DescriptionDetailItemWrapper>
            </DescriptionDetailList>
          </PrivacyItem>
          <PrivacyItem>
            <SubHead>
              제7조 [개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항]
            </SubHead>
            <DescriptionList>
              <DescriptionItem>
                싸피메이트는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
                이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
              </DescriptionItem>
              <DescriptionItem>
                쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터
                브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의
                하드디스크에 저장되기도 합니다.
              </DescriptionItem>
            </DescriptionList>
            <DescriptionDetailList>
              <DescriptionDetailItem>
                1. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에
                대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여
                이용자에게 최적화된 정보 제공을 위해 사용됩니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                2. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷
                옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수
                있습니다.
              </DescriptionDetailItem>
              <DescriptionDetailItem>
                3. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할
                수 있습니다.
              </DescriptionDetailItem>
            </DescriptionDetailList>
          </PrivacyItem>
        </PrivacyList>
        <NoticeDate>
          이 개인정보처리방침은 2022년 02월 11일부터 적용됩니다.
        </NoticeDate>
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  max-width: 1000px;
  margin: 140px auto 0;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 575px) {
    margin-top: 120px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  border: 1px solid #d7e2eb;
  border-radius: 6px;

  @media (max-width: 767px) {
    padding: 28px;
  }
  @media (max-width: 575px) {
    padding: 26px;
  }
`;

const Head = styled.h1`
  margin-bottom: 52px;
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  color: #263747;

  @media (max-width: 575px) {
    margin-bottom: 40px;
    font-size: 22px;
  }
`;

const PrivacyPreDescriptionWrapper = styled.div``;

const DescriptionDetailItem = styled.li`
  width: 100%;
  margin: 0px 0px 12px;
  line-height: 1.6;
`;

const DescriptionList = styled.ol``;

const DescriptionItem = styled.li`
  width: 100%;
  margin: 0px 0px 12px;
  line-height: 1.6;
`;

const DescriptionDetailList = styled.ol``;

const DescriptionDetailItemWrapper = styled.ol``;

const DescriptionDetailItemHead = styled.h3`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  color: #263747;

  @media (max-width: 575px) {
    font-size: 16px;
  }
`;

const PrivacyContentsList = styled.ol`
  margin-top: 0px;
  margin-left: 32px;
  padding: 0px;
  list-style-position: outside;
  list-style-image: initial;
`;

const PrivacyContentsItem = styled.li`
  line-height: 1.6;

  &:last-of-type {
    margin-bottom: 12px;
  }
`;

const PrivacyList = styled.ol``;

const PrivacyItem = styled.li`
  margin-top: 42px;

  @media (max-width: 575px) {
    margin-top: 38px;
  }
`;

const SubHead = styled.h2`
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  color: #263747;
  text-align: left;

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

const NoticeDate = styled.p`
  margin-top: 32px;
  font-size: 16px;
  font-weight: 600;
  color: #263747;
  line-height: 1.6;

  @media (max-width: 575px) {
    margin-top: 30px;
  }
`;

export default PrivacySection;
