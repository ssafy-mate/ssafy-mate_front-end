import { RootState } from '../types/authTypes';
import { useSelector } from 'react-redux';

import { UserTechStack } from './useUserInfo';
import { TechStackWithImg } from '../types/commonTypes';
import { TechStacksWithLevel } from '../types/signUpTypes';

export interface convertTechStackWithImg {
  teckStackList: TechStackWithImg[];
  teckStackListWithLevel: TechStacksWithLevel[];
}

const useProfileTechStacks = () => {
  const profileTechStacks = useSelector<RootState, UserTechStack[] | null>(
    (state) => state.profile.techStacks,
  );
  let oldTechStackList: TechStackWithImg[] = [];
  let oldTechStackListWithLevel: TechStacksWithLevel[] = [];
  profileTechStacks?.forEach((techStack) => {
    oldTechStackList.push({
      id: techStack.id,
      techStackName: techStack.techStackName,
      techStackImgUrl: techStack.techStackImgUrl,
    });
    oldTechStackListWithLevel.push({
      techStackCode: techStack.id,
      techStackLevel: techStack.techStackLevel,
    });
  });
  const oldTechStackWithImg: convertTechStackWithImg = {
    teckStackList: oldTechStackList,
    teckStackListWithLevel: oldTechStackListWithLevel,
  };

  return oldTechStackWithImg;
};

export default useProfileTechStacks;
