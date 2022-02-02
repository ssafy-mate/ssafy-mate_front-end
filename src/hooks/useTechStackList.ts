import { useState, useEffect } from 'react';

import { TechStackWithImg } from '../types/commonTypes';

import TechStackService from '../services/TechStackService';

const useTechStackList = () => {
  const [techStackList, setTechStackList] = useState<TechStackWithImg[]>([]);

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
