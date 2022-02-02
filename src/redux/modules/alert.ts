import { SHOW_ALERT, HIDE_ALERT, alertState } from '../../types/signInTypes';
import { Severity } from '../../types/signUpTypes';

const controlAlert = (
  state = {
    show: false,
    text: null,
    type: 'info',
  },
  action: { type: string; payload: alertState },
) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ALERT:
      return {
        show: payload.show,
        text: payload.text,
        type: payload.type,
      };
    case HIDE_ALERT:
      return {
        show: false,
        text: null,
        type: null,
      };
    default:
      return state;
  }
};

export default controlAlert;

export const showSsafyMateAlert = (
  show: boolean,
  text: string,
  type: Severity,
) => {
  return {
    type: SHOW_ALERT,
    payload: {
      show,
      text,
      type,
    },
  };
};

export const hideAlert = (show: boolean, text: string, type: Severity) => {
  return {
    type: HIDE_ALERT,
    payload: {
      show,
      text,
      type,
    },
  };
};
