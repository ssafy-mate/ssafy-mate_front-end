import { axiosInstance } from '../utils/axios';

import { TechStackWithImg } from '../types/commonTypes';

class TechStackService {
  public static async getTechStackList(): Promise<TechStackWithImg[]> {
    const response = await axiosInstance.get('/api/techstack-list');

    return response.data.techStackList;
  }
}

export default TechStackService;
