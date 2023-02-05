import { IFSet } from '@/interfaces/interfaces';
import { StyledFSetItem } from './FSetItem.styled';

interface IProp {
  fSet: IFSet;
}

export const FSetItem = ({ fSet }: IProp) => {
  return <StyledFSetItem></StyledFSetItem>;
};
