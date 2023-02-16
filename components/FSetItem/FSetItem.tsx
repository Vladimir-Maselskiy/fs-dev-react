import { useEffect, useState } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import { StyledFSetItem } from './FSetItem.styled';
import { ControlButtons } from '../СontrolButtons/СontrolButtons';
import { ImportantSetsOptions } from '../ImportantSetsOptions/ImportantSetsOptions';
import { QuantityOfSets } from '../QuantityOfSets/QuantityOfSets';
import { WidthAndHeightInput } from '../WidthAndHeightInput/WidthAndHeightInput';
import { useFSetsContext } from '@/context/state';
import { getSetRestrictions } from '@/utils/getSetRestrictions';
import { TRestrictions } from '@/const';

interface IProp {
  fSet: IFSet;
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

export const FSetItem = ({
  fSet,
  setIsModalOpen,
  setCurrentSetId,
  setCurrentModalNumber,
}: IProp) => {
  const { setFSetsArray } = useFSetsContext();
  const [
    isOptitionButtonDisabled,
    setIsOptitionButtonDisabled,
  ] = useState(true);
  const [counter, setCounter] = useState<number>(
    fSet.quantitySet
  );

  const [restrictions, setRestrictions] =
    useState<TRestrictions>(getSetRestrictions(fSet));

  useEffect(() => {
    if (fSet) setRestrictions(getSetRestrictions(fSet));
  }, [fSet]);

  return (
    <StyledFSetItem>
      <WidthAndHeightInput
        setIsOptitionButtonDisabled={
          setIsOptitionButtonDisabled
        }
        id={fSet.id}
        restrictions={restrictions}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <QuantityOfSets
          counter={counter}
          setCounter={setCounter}
        />
        <ImportantSetsOptions fSet={fSet} />
      </Box>
      <ControlButtons
        isOptitionButtonDisabled={isOptitionButtonDisabled}
        setIsModalOpen={setIsModalOpen}
        id={fSet.id}
        setCurrentSetId={setCurrentSetId}
        setCurrentModalNumber={setCurrentModalNumber}
      />
    </StyledFSetItem>
  );
};
