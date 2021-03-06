import axios from 'axios';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
  });

  return axiosInstance;
};

const createAxiosSocketInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SOCKET_SERVER_URL,
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
export const axiosSocketInstance = createAxiosSocketInstance();
