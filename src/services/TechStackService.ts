import { axiosInstance } from '../utils/axios';

import { TechStack } from '../types/commonTypes';

class TechStackService {
  public static async getTechStackList(): Promise<TechStack[]> {
    const response = await axiosInstance.get('/api/techstack-list');

    return response.data.techStackList;
  }
}

export default TechStackService;
