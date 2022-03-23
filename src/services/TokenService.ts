import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

const LOCAL_STORAGE_TOKEN_KEY_NAME = 'token';

dayjs.extend(isSameOrAfter);

export default class TokenService {
  public static get(): string | null {
    const token_date_expired = localStorage.getItem('token_date');

    if (dayjs().isSameOrAfter(token_date_expired)) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
      localStorage.removeItem('token_date');
      localStorage.removeItem('persist:root');
      window.location.replace('/');
      return null;
    } else {
      return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
    }
  }

  public static set(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
    localStorage.setItem(
      'token_date',
      dayjs().add(3, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS'),
    );
  }

  public static remove(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }
}
