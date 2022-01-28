import { axiosInstance } from '../utils/axios';

import { TechStackWtihImg } from '../types/commonTypes';

class TechStackService {
  public static async getTechStackList(): Promise<TechStackWtihImg[]> {
    const response = await axiosInstance.get('/api/techstack-list');

    return response.data.techStackList;
  }
}

export default TechStackService;
