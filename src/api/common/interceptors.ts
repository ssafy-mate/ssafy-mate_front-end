import { AxiosInstance } from 'axios';

function setInterseptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(
    function (config: any) {
      const token = 'temp';

      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    function (error: Error | null) {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    function (response: object) {
      return response;
    },
    function (error: Error | null) {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

export default setInterseptors;
