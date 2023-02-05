import { IFSetsArray } from '@/interfaces/interfaces';
import { FSetItem } from '../FSetItem/FSetItem';
import { StyledFSetList } from './FSetList.styled';

export default function FSetList({
  fSetsArray,
}: IFSetsArray) {
  return (
    <StyledFSetList>
      {fSetsArray.map(fSet => (
        <FSetItem key={fSet.id} fSet={fSet}></FSetItem>
      ))}
    </StyledFSetList>
  );
}
