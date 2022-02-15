import styled from '@emotion/styled';

interface PcBoxProps {
  imgUrl: string;
  isVisible: boolean;
}

const PcBox: React.FC<PcBoxProps> = ({ imgUrl, isVisible }) => {
  return (
    <Box className={isVisible ? 'scroll' : ''}>
      <div className="pc">
        <div className="screen">
          <div
            className="viewport"
            style={{
              backgroundImage: `url(${imgUrl})`,
            }}
          ></div>
        </div>
        <div className="logo"></div>
        <div className="leg"></div>
        <div className="foot"></div>
      </div>
      <Text>* 상단의 모니터 화면에 마우스를 올려보세요.</Text>
    </Box>
  );
};

const Box = styled.div`
  opacity: 0;
  width: 100%;
  max-width: 560px;

  &.scroll {
    animation: 0.6s ease-in-out 0.6s 1 normal forwards running fadeinBottom;
  }

  .screen {
    position: relative;
    width: 100%;
    background: #ededed;
    border: 2px solid #cecece;
    border-bottom: 2px solid #878787;
    border-radius: 3% 3% 0 0 / 5% 5% 0 0;
    box-sizing: border-box;
  }

  .screen:before {
    content: 'SAMSUNG';
    display: block;
    margin-bottom: 2px;
    padding-top: 60%;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-weight: 800;
    font-size: 11px;
    color: #7c8182;
    text-align: center;
  }

  .logo {
    position: relative;
    width: 100%;
    border: 2px solid #cecece;
    border-top: none;
    border-radius: 0 0 3% 3%/ 0 0 33.33% 33.33%;
    box-sizing: border-box;
    background: linear-gradient(90deg, #acacac, #acacac);
  }

  .logo:before {
    content: '';
    display: block;
    padding-top: 9%;
  }

  .viewport {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 4%;
    background-color: #333;
  }

  .leg {
    position: relative;
    width: 20%;
    margin: 0 auto;
  }

  .leg:before {
    content: '';
    display: block;
    padding-top: 46%;
    background: linear-gradient(
      #acacac,
      #abacaf 26%,
      #d0d1d2 57%,
      #f2f2f2 76%,
      #e4e4e4 84%,
      #acacac
    );
  }

  .foot {
    position: relative;
    width: 20%;
    margin: 0 auto;
    perspective: 180px;
  }

  .foot:before {
    content: '';
    display: block;
    padding-top: 40%;
    border-radius: 0 0 10% 10% / 0 0 30% 30%;
    box-shadow: 0 -10px 5px rgba(255, 255, 255, 0.1) inset,
      0 -17px 6px rgba(0, 0, 0, 0.1) inset;
    background: linear-gradient(
      #7b7b7b,
      #7f7f7f 39%,
      #a6a6a6 53%,
      #ccc 67%,
      #aaa 86%,
      #eee 88%,
      #fff 95%,
      #a9a9a9 95%,
      #000
    );
    transform: rotateX(68deg);
    transform-origin: center top;
  }

  .pc .viewport {
    overflow: hidden;
    background-position: 0 0;
    background-size: 100% auto;
    transition: background-position 3s ease;
    cursor: pointer;
  }

  .pc:hover .viewport {
    background-position: 0 100%;
  }

  .pc .viewport:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(
      circle at right bottom,
      transparent 75%,
      rgba(255, 255, 255, 0.05) 75%,
      transparent
    );
  }

  @media (max-width: 991px) {
    margin: 0 auto;

    .screen:before {
      font-size: 10px;
    }
  }
  @media (max-width: 575px) {
    max-width: 420px;

    .screen:before {
      font-size: 8px;
    }
  }

  @keyframes fadeinBottom {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const Text = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  font-size: 15px;
  color: #98a8b9;

  @media (max-width: 575px) {
    margin-top: 8px;
    font-size: 14px;
  }
`;

export default PcBox;
