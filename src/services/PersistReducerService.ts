export default class PersistReducerService {
  public static remove(): void {
    localStorage.removeItem('persist:root');
  }
}
