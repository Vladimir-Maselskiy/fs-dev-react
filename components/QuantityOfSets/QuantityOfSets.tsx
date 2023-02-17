import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/getSetById';
import { Button, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { Box } from '../Box/Box';

type TProps = {
  id: string;
};

export const QuantityOfSets = ({ id }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const [fSet, setFSet] = useState(
    getSetById(id, fSetsArray)
  );

  useEffect(() => {
    if (fSet)
      setFSetsArray(prev => {
        return prev.map(set => {
          if (set.id === id)
            return {
              ...set,
              quantitySet: fSet?.quantitySet,
            };
          return set;
        });
      });
  }, [fSet?.quantitySet]);

  const onChangeCounterByClick = (num: number): void => {
    if (fSet) {
      if (fSet.quantitySet <= 1 && num < 0) return;
      if (fSet.quantitySet >= 99 && num > 0) return;
      setFSet({ ...fSet, quantitySet: ++fSet.quantitySet });
    }
  };

  const onChangeInput = (value: number | null) => {
    if (value && fSet)
      setFSet({ ...fSet, quantitySet: value });
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
          value={fSet?.quantitySet}
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
