import axios from 'axios';

import setInterseptors from './common/interceptors';

function createAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCALHOST_URL,
  });

  return axiosInstance;
}

function createAxiosInstanceWithAuth() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCALHOST_URL,
  });
  const axiosInstanceWithAuth = setInterseptors(axiosInstance);

  return axiosInstanceWithAuth;
}

export const axiosInstance = createAxiosInstance();
export const axiosInstanceWithAuth = createAxiosInstanceWithAuth();
