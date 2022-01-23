import { AutocompleteGetTagProps } from '@mui/material';

export interface TechStack {
  id: string;
  name: string;
  imgUrl: string;
}

export interface TechStackTagProps
  extends TechStack,
    ReturnType<AutocompleteGetTagProps> {}

export interface HomeBannerCardData {
  head: string;
  subHead: string;
  descriptions: string[];
  pageUrl: string;
  imgUrl: string;
}

export interface HomeBannerSlideData extends HomeBannerCardData {
  hexColorCode: string;
}

export interface ProjectLinkCardProps {
  projectName: string;
  pageUrl: string;
  imgUrl: string;
  hexColorCode: string;
}
