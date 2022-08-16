import { ICategory } from './iCategory.types';

export interface PropsDropDownFilter {
  setSelectedOrder: (arg0: string) => void;
  setSelectedFilter: (arg0: string) => void;
  categories?: ICategory[];
}
