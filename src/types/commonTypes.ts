import { AutocompleteGetTagProps } from '@mui/material';

export type ProjectTrack = string;

export interface Img {
  imgUrl: string;
  width: number;
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
  imageUrl: string;
}

export interface HomeBannerSlideType extends HomeBannerCardData {
  id: number;
  hexColorCode: string;
}

export interface ProjectTrackCardType {
  head: string;
  subHead: string;
  description: string;
  imageUrl: string;
}

export interface ProjectTrackBannerType extends ProjectTrackCardType {
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

export interface MobileServiceIntroductionType {
  id: number;
  headText: string;
  subHeadText: string;
  descriptionText: string;
  smallImg: Img;
  mediumImg: Img;
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
