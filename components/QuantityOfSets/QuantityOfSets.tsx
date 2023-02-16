import { Button, ConfigProvider, InputNumber } from 'antd';
import React from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { Box } from '../Box/Box';

type TProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const QuantityOfSets = ({
  counter,
  setCounter,
}: TProps) => {
  const onChangeCounterByClick = (num: number): void => {
    if (+counter <= 1 && num < 0) return;
    if (+counter >= 99 && num > 0) return;
    setCounter(prev => prev + num);
  };

  const onChangeInput = (value: number | null) => {
    if (value) setCounter(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width={180}
    >
      <p>Кількість</p>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Button
          type="default"
          style={{ width: '50px', height: '50px' }}
          icon={
            <AiOutlineMinus
              size={40}
              color="var(--accent-color)"
            />
          }
          onClick={() => onChangeCounterByClick(-1)}
        ></Button>

        <InputNumber
        type="number"
        inputMode="numeric"
        pattern="\d"
          min={1}
          max={99}
          controls={false}
          style={{
            width: '60px',
            height: '50px',
            fontSize: '30px',
            paddingTop: '10px',
          }}
          onChange={onChangeInput}
          value={counter}
        />
        <Button
          type="default"
          style={{ width: '50px', height: '50px' }}
          icon={
            <AiOutlinePlus
              size={40}
              color="var(--accent-color)"
            />
          }
          onClick={() => onChangeCounterByClick(1)}
        ></Button>
      </Box>
    </Box>
  );
};
