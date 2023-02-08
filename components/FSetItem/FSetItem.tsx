import { useState } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import { StyledFSetItem } from './FSetItem.styled';
import { ControlButtons } from '../СontrolButtons/СontrolButtons';
import { ImportantSetsOptions } from '../ImportantSetsOptions/ImportantSetsOptions';
import { QuantityOfSets } from '../QuantityOfSets/QuantityOfSets';
import { WidthAndHeightInput } from '../WidthAndHeightInput/WidthAndHeightInput';

interface IProp {
  fSet: IFSet;
}

export const FSetItem = ({ fSet }: IProp) => {
  const [
    isOptitionButtonDisabled,
    setIsOptitionButtonDisabled,
  ] = useState(true);
  const [counter, setCounter] = useState<string>(
    fSet.quantitySet
  );
  const [width, setWidth] = useState<string>(fSet.width);
  const [height, setHeight] = useState<string>(fSet.height);

  return (
    <StyledFSetItem>
      <WidthAndHeightInput
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
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
      />
    </StyledFSetItem>
  );
};
