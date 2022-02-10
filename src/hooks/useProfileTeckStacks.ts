import { RootState } from '../types/authTypes';
import { useSelector } from 'react-redux';

import { TechStackWithImg } from '../types/commonTypes';
import { TechStacksWithLevel } from '../types/signUpTypes';
import { UserTechStack } from '../types/userTypes';

export interface convertTechStackWithImg {
  teckStackList: TechStackWithImg[];
  teckStackListWithLevel: TechStacksWithLevel[];
}

const useProfileTechStacks = () => {
  const profileTechStacks = useSelector<RootState, UserTechStack[] | undefined>(
    (state) => state.profile.info?.techStacks,
  );
  let oldTechStackList: TechStackWithImg[] = [];
  let oldTechStackListWithLevel: TechStacksWithLevel[] = [];
  profileTechStacks?.forEach((techStack) => {
    oldTechStackList.push({
      techStackId: techStack.techStackId,
      techStackName: techStack.techStackName,
      techStackImgUrl: techStack.techStackImgUrl,
    });
    oldTechStackListWithLevel.push({
      techStackId: techStack.techStackId,
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
