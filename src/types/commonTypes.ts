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

export interface HomeBannderCardProps extends HomeBannerCardData {}

export interface HomeBannerSlideData extends HomeBannerCardData {
  hexColorCode: string;
}

export interface ProjectLinkCardData {
  projectName: string;
  pageUrl: string;
  imgUrl: string;
  hexColorCode: string;
}

export interface ProjectLinkCardProps extends ProjectLinkCardData {}
