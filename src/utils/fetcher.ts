import { axiosInstance } from './axios';

export const fetcherGet = <Data>(url: string) =>
  axiosInstance.get<Data>(url).then((response) => response.data);

export const fetcherPost = <Data>(url: string, params: Data) =>
  axiosInstance.post<Data>(url, params).then((response) => response.data);
