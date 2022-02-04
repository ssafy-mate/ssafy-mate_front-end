import { findId, findIdResponse } from '../types/authTypes';

import { axiosInstance } from '../utils/axios';

class FindIdService {
  public static async getUserId(data: findId): Promise<findIdResponse> {
    const response = await axiosInstance.get<findIdResponse>(
      '/api/user/id-search',
      {
        params: data,
      },
    );

    return response.data;
  }
}

export default FindIdService;
