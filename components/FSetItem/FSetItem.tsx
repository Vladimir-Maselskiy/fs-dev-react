import { useEffect, useState } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import { StyledFSetItem } from './FSetItem.styled';
import { ControlButtons } from '../СontrolButtons/СontrolButtons';
import { ImportantSetsOptions } from '../ImportantSetsOptions/ImportantSetsOptions';
import { QuantityOfSets } from '../QuantityOfSets/QuantityOfSets';
import { WidthAndHeightInput } from '../WidthAndHeightInput/WidthAndHeightInput';
import { useFSetsContext } from '@/context/state';
import { checkWidthOnSizeRestrictions } from '@/utils/checkWidthOnSizeRestrictions';
import { setInputValidation } from '@/utils/setInputValidation';
import { checkHeightOnSizeRestrictions } from '@/utils/checkHeightOnSizeRestrictions';

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
  const [counter, setCounter] = useState<string>(
    fSet.quantitySet
  );
  const [width, setWidth] = useState<string>(fSet.width);
  const [height, setHeight] = useState<string>(fSet.height);

  useEffect(() => {
    if (
      fSet.isWidthValid === 'valid' &&
      fSet.isHeightValid === 'valid'
    ) {
      setIsOptitionButtonDisabled(false);
    } else setIsOptitionButtonDisabled(true);
  }, [fSet.isWidthValid, fSet.isHeightValid]);

  return (
    <StyledFSetItem>
      <WidthAndHeightInput
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
        fSet={fSet}
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
