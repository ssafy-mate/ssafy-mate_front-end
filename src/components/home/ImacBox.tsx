import styled from '@emotion/styled';

interface ImacBoxProps {
  imgUrl: string;
  isVisible: boolean;
}

const ImacBox: React.FC<ImacBoxProps> = ({ imgUrl, isVisible }) => {
  return (
    <Box className={isVisible ? 'scroll' : ''}>
      <div className="imac">
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
  width: 100%;
  max-width: 540px;
  opacity: 0;

  &.scroll {
    animation: 0.6s ease-in-out 0.6s 1 normal forwards running fadeinBottom;
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

  @media (max-width: 991px) {
    margin: 0 auto;
  }
  @media (max-width: 575px) {
    max-width: 420px;
  }

  .screen {
    position: relative;
    width: 100%;
    background: #000;
    border-radius: 3% 3% 0 0 / 5% 5% 0 0;
  }

  .screen:before {
    content: '';
    display: block;
    padding-top: 60%;
  }

  .logo {
    position: relative;
    width: 100%;
    background: linear-gradient(90deg, #a6a6aa, #e1e2e4);
    border-radius: 0 0 3% 3%/ 0 0 33.33% 33.33%;
  }

  .logo:before {
    content: '';
    display: block;
    padding-top: 9%;
  }

  .logo:after {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    width: 4.8%;
    margin-left: -2.4%;
    padding-top: 4.8%;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB2aWV3Qm94PScwIDAgMTAwIDEwMCcgc3R5bGU9J2hlaWdodDoyNHB4O3dpZHRoOjI0cHg7Jz4NCgk8cGF0aCBkPSdNNzcuMjk1IDUzLjEzNGMtMC4xMjYtMTIuNjY0IDEwLjMyOC0xOC43MzggMTAuNzk1LTE5LjA0MC01Ljg3NC04LjU5Ni0xNS4wMjQtOS43NzMtMTguMjg1LTkuOTA5LTcuNzg3LTAuNzg4LTE1LjE5NSA0LjU4NS0xOS4xNDcgNC41ODUtMy45NDIgMC0xMC4wNDEtNC40NjgtMTYuNDk5LTQuMzUxLTguNDg4IDAuMTI2LTE2LjMxNCA0LjkzNS0yMC42ODUgMTIuNTM3LTguODE5IDE1LjMwMy0yLjI1OCAzNy45NzMgNi4zMzcgNTAuMzgzIDQuMiA2LjA3NSA5LjIwOCAxMi44OTggMTUuNzg0IDEyLjY1NCA2LjMzMi0wLjI1MyA4LjcyNy00LjA5NyAxNi4zODItNC4wOTcgNy42NTYgMCA5LjgwNyA0LjA5NyAxNi41MDkgMy45NzIgNi44MTQtMC4xMjcgMTEuMTMxLTYuMTkxIDE1LjMwMi0xMi4yODUgNC44MjMtNy4wNDggNi44MDktMTMuODcxIDYuOTI2LTE0LjIyMS0wLjE1MS0wLjA2OS0xMy4yODctNS4xMDEtMTMuNDE5LTIwLjIyOHpNNjQuNzAzIDE1Ljk2OWMzLjQ5LTQuMjM0IDUuODQ2LTEwLjEwOSA1LjIwMy0xNS45NjktNS4wMjcgMC4yMDUtMTEuMTIxIDMuMzQ5LTE0LjcyOCA3LjU3My0zLjIzNyAzLjc0OC02LjA2OSA5LjcyOS01LjMxIDE1LjQ3MiA1LjYxMiAwLjQzOCAxMS4zNDEtMi44NTIgMTQuODM0LTcuMDc3eicgLz4NCjwvc3ZnPg0KDQo=');
  }

  .viewport {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 4%;
    background: #333;
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
      #7a7b80,
      #abacaf 26%,
      #d0d1d2 57%,
      #f2f2f2 76%,
      #e4e4e4 84%,
      #787878
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
    transform: rotateX(68deg);
    transform-origin: center top;
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
    border-radius: 0 0 10% 10% / 0 0 30% 30%;
    box-shadow: 0 -10px 5px rgba(255, 255, 255, 0.1) inset,
      0 -17px 6px rgba(0, 0, 0, 0.1) inset;
  }

  .imac .viewport {
    overflow: hidden;
    background-position: 0 0;
    background-size: 100% auto;
    transition: background-position 3s ease;
    cursor: pointer;
  }

  .imac:hover .viewport {
    background-position: 0 100%;
  }

  .imac .viewport:after {
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

export default ImacBox;
