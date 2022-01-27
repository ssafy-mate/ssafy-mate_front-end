import { AutocompleteGetTagProps } from '@mui/material';

export interface TechStack {
  id: number;
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

export interface ProjectBannerSlideData extends ProjectBannerCardData {
  id: number;
  hexColorCode: string;
}

export interface ProjectLinkCardData {
  projectName: string;
  pageUrl: string;
  imgUrl: string;
  hexColorCode: string;
  trackOptions?: string[];
}

export interface ProjectLinkCardProps extends ProjectLinkCardData {}

export type ProjectTrack = string;
