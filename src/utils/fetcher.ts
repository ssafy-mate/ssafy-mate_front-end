import { axiosInstance } from './axios';

export const fetcherGet = <Data>(url: string, token: string | null) =>
  axiosInstance
    .get<Data>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);

export const fetcherPost = <Data>(url: string, params: Data) =>
  axiosInstance.post<Data>(url, params).then((response) => response.data);
