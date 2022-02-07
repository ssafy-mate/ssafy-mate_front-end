import { Severity } from './../types/signUpTypes';
import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../redux/modules/alert';

//사용법 : userAlert(보일지말지,문구,색);
const useAlert = (
  showAlert: boolean,
  alertText: string,
  alertType: Severity,
) => {
  const dispatch = useDispatch();

  dispatch(
    showSsafyMateAlert({
      show: showAlert,
      text: alertText,
      type: alertType,
    }),
  );
};

export default useAlert;
