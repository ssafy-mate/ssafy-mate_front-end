import { AutocompleteGetTagProps } from '@mui/material';

export type ProjectTrack = string;

export interface Img {
  imgUrl: string;
  size: number;
}

export interface TechStack {
  techStackId: number;
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
  videoUrl: string;
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
  project: string;
  pageUrl: string;
  smallImg: Img;
  mediumImg: Img;
  largeImg: Img;
  hexColorCode: string;
  trackOptions?: string[];
}

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
