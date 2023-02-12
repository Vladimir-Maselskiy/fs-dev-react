import { IFSet } from '@/interfaces/interfaces';
import { FSetItem } from '../FSetItem/FSetItem';
import { StyledFSetList } from './FSetList.styled';

interface IProps {
  fSetsArray: IFSet[];
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setCurrentSetId: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export default function FSetList({
  fSetsArray,
  setIsModalOpen,
  setCurrentSetId,
}: IProps) {
  return (
    <StyledFSetList>
      {fSetsArray.map(fSet => (
        <FSetItem
          key={fSet.id}
          fSet={fSet}
          setIsModalOpen={setIsModalOpen}
          setCurrentSetId={setCurrentSetId}
        ></FSetItem>
      ))}
    </StyledFSetList>
  );
}
