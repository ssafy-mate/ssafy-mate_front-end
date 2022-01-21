import { AutocompleteGetTagProps } from '@mui/material';

export interface TechStack {
  id: string;
  name: string;
  imgUrl: string;
}

export interface TechStackTagProps
  extends TechStack,
    ReturnType<AutocompleteGetTagProps> {}

export interface SsafyAuth {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
}

export interface SsafyAuthResopnse {
  status: number;
  success: boolean;
  message: string;
}
