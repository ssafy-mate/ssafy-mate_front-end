import { createAction, handleActions } from 'redux-actions';
import { alertState } from '../../types/alertTypes';

export const alertInitialState: alertState = {
  show: false,
  text: '',
  type: 'info',
};

export const showSsafyMateAlert = createAction('SHOW_ALERT');

const controlAlert = handleActions<alertState, alertState>(
  {
    SHOW_ALERT: (state, action) => ({
      ...state,
      show: action.payload.show,
      text: action.payload.text,
      type: action.payload.type,
    }),
  },
  alertInitialState,
);

export default controlAlert;
