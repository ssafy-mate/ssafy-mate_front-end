import axios from 'axios';

function createAxiosInstance() {
  const axiosInstance = axios.create({
    // 서버에서 데이터 요청하려면 여기 바꾸기!!
    // baseURL: process.env.REACT_APP_LOCALHOST_URL,
    // baseURL: process.env.REACT_APP_SERVER_URL,
    baseURL: process.env.REACT_APP_LOCALSERVER_URL,
  });

  return axiosInstance;
}

export const axiosInstance = createAxiosInstance();
