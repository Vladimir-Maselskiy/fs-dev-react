import { onInputInInput } from '@/utils/onInputInInput';
import React from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { Box } from '../Box/Box';
import {
  StyledButton,
  StyledSetsCounter,
} from './QuantityOfSets.styled';

type TProps = {
  counter: string;
  setCounter: React.Dispatch<React.SetStateAction<string>>;
};

export const QuantityOfSets = ({
  counter,
  setCounter,
}: TProps) => {
  const onChangeCounterByClick = (num: number): void => {
    if (+counter <= 0 && num < 0) return;
    if (+counter >= 99 && num > 0) return;
    setCounter(prev => String(+prev + num));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width={160}
    >
      <p>Кількість</p>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <StyledButton
          type="button"
          onClick={() => onChangeCounterByClick(-1)}
        >
          <AiOutlineMinus
            size={40}
            color="var(--accent-color)"
          />
        </StyledButton>
        <StyledSetsCounter
          type="number"
          value={counter}
          onChange={e => onInputInInput(e, 2, setCounter)}
        />
        <StyledButton
          type="button"
          onClick={() => onChangeCounterByClick(1)}
        >
          <AiOutlinePlus
            size={40}
            color="var(--accent-color)"
          />
        </StyledButton>
      </Box>
    </Box>
  );
};
