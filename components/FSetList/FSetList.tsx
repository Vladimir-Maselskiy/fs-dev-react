import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
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
  setCurrentModalNumber: React.Dispatch<
    React.SetStateAction<number>
  >;
}

export default function FSetList({
  fSetsArray,
  setIsModalOpen,
  setCurrentSetId,
  setCurrentModalNumber,
}: IProps) {
  return (
    <Box display="flex" flexDirection="column" mt={10}>
      <StyledFSetList>
        {fSetsArray.map(fSet => (
          <FSetItem
            key={fSet.id}
            fSet={fSet}
            setIsModalOpen={setIsModalOpen}
            setCurrentSetId={setCurrentSetId}
            setCurrentModalNumber={setCurrentModalNumber}
          ></FSetItem>
        ))}
      </StyledFSetList>
    </Box>
  );
}
