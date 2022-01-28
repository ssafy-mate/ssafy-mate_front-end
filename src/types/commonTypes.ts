import { RouterState } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';

import { AutocompleteGetTagProps } from '@mui/material';

export type ProjectTrack = string;

export interface TechStack {
  id: number;
  techStackName: string;
}

export interface TechStackWtihImg extends TechStack {
  techStackImgUrl: string;
}

export interface TechStackTagProps
  extends TechStackWtihImg,
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

interface ProjectType {
  projectId: number;
  projectName: string;
  projectTrack?: string | null;
  team: string | null;
}

interface UserState {
  projects: ProjectType[] | null;
  loading: boolean;
  error: Error | null;
}

export interface RootState {
  user: UserState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}
