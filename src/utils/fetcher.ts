import { axiosInstance } from './axios';

interface ChatLogParams {
  nowPage: number;
  entryTime: string;
}

export const fetcherGet = <Data>(url: string) =>
  axiosInstance.get<Data>(url).then((response) => response.data);

export const fetcherPost = <Data>(url: string, params: Data) =>
  axiosInstance.post<Data>(url, params).then((response) => response.data);

export const fetcherGetWithParams = <Data>(
  url: string,
  params: ChatLogParams,
) =>
  axiosInstance
    .get(url, {
      params,
    })
    .then((response) => response.data);

// export const fetcherWithToken = <Data>(url: string, token: string) =>
//   axiosInstance
//     .get(url, {
//       headers: {
//         Authorization: `Bearer ${data.access_token}`,
//       },
//     })
//     .then((response) => response.data);
