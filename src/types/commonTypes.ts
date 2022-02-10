import { AutocompleteGetTagProps } from '@mui/material';

export type ProjectTrack = string;

export interface TechStack {
  id: number;
  techStackName: string;
}

export interface TechStackWithImg extends TechStack {
  techStackImgUrl: string;
}

export interface TechStackTagProps
  extends TechStackWithImg,
    ReturnType<AutocompleteGetTagProps> {}

export interface HomeBannerCardData {
  head: string;
  subHead: string;
  descriptions: string[];
  imgUrl: string;
}

export interface HomeBannderCardProps extends HomeBannerCardData {}

export interface HomeBannerSlideType extends HomeBannerCardData {
  id: number;
  hexColorCode: string;
}

export interface ProjectBannerCardData {
  head: string;
  subHead: string;
  description: string;
  imgUrl: string;
}

export interface ProjectBannerCardProps extends ProjectBannerCardData {}

export interface ProjectBannerSlideType extends ProjectBannerCardData {
  id: number;
  hexColorCode: string;
}

export interface ProjectLinkCardType {
  projectId: number;
  projectName: string;
  pageUrl: string;
  imgUrl: string;
  hexColorCode: string;
  trackOptions?: string[];
}

export interface ProjectLinkCardProps extends ProjectLinkCardType {}

export interface ErrorResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface ServiceIntroductionType {
  id: number;
  headText: string;
  subHeadText: string;
  descriptionText: string;
  imgUrl: string;
}
