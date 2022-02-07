import axios from 'axios';

function createAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCALHOST_URL,
    // baseURL: process.env.REACT_APP_SERVER_URL,
    // baseURL: process.env.REACT_APP_LOCALSERVER_URL,
  });

  return axiosInstance;
}

export const axiosInstance = createAxiosInstance();
