class PersistReducerService {
  public static remove(): void {
    localStorage.removeItem('persist:root');
  }
}

export default PersistReducerService;
