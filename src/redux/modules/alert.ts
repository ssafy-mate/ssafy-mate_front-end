import { createAction, handleActions } from 'redux-actions';
import { AlertState } from '../../types/alertTypes';

export const initialState: AlertState = {
  show: false,
  text: '',
  type: undefined,
};

export const showSsafyMateAlert = createAction('SHOW_ALERT');

const reducer = handleActions<AlertState, AlertState>(
  {
    SHOW_ALERT: (state, action) => ({
      ...state,
      show: action.payload.show,
      text: action.payload.text,
      type: action.payload.type,
    }),
  },
  initialState,
);

export default reducer;
