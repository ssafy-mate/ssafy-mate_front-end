/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const sweetAlertStyles = css`
  .swal2-icon {
    font-size: 16px;
  }
  .swal2-title {
    font-size: 26px;
  }
  .swal2-html-container {
    font-size: 18px;
  }
  .swal2-styled.swal2-confirm,
  .swal2-styled.swal2-cancel {
    font-size: 16px;
  }

  @media (max-width: 575px) {
    .swal2-icon {
      font-size: 14px;
    }
    .swal2-title {
      font-size: 22px;
    }
    .swal2-html-container {
      font-size: 16px;
    }
    .swal2-styled.swal2-confirm,
    .swal2-styled.swal2-cancel {
      font-size: 14px;
    }
  }
`;

export default sweetAlertStyles;
