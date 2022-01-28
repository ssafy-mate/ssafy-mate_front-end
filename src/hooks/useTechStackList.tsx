import { useState, useEffect } from 'react';

import { TechStack } from '../types/commonTypes';

import TechStackService from '../services/TechStackService';

const useTechStackList = () => {
  const [techStackList, setTechStackList] = useState<TechStack[]>([]);

  useEffect(() => {
    async function fetchTechStackList() {
      const techStackList = await TechStackService.getTechStackList();

      setTechStackList(techStackList);
    }

    fetchTechStackList();
  }, []);

  return techStackList;
};

export default useTechStackList;
