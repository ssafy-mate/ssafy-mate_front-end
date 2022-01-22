import { AutocompleteGetTagProps } from '@mui/material';

export interface TechStack {
  id: string;
  name: string;
  imgUrl: string;
}

export interface TechStackTagProps
  extends TechStack,
    ReturnType<AutocompleteGetTagProps> {}
