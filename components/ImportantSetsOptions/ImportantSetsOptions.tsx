import React, { useState, useEffect } from 'react';
import { Radio, RadioChangeEvent, Select } from 'antd';
import { useFSetsContext } from '@/context/state';

import { getPVСSystemSelectOpions } from '@/utils/getPVСSystemSelectOpions';
import { getSetById } from '@/utils/getSetById';
import { Box } from '../Box/Box';
import { StyledP } from './ImportantSetsOptions.styled';

type TProps = {
  id: string;
};

export const ImportantSetsOptions = ({ id }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState(
    getSetById(id, fSetsArray)
  );

  useEffect(() => {
    if (fSet) {
      setFSetsArray(prev =>
        prev.map(set => {
          if (set.id === id)
            return {
              ...set,
              sideOfHinge: fSet.sideOfHinge,
            };
          return set;
        })
      );
    }
  }, [fSet?.sideOfHinge]);

  const onChangeRadio = (e: RadioChangeEvent) => {
    if (fSet)
      setFSet({ ...fSet, sideOfHinge: e.target.value });
  };
  const handleChangeSelect = () => {};

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={10}
      >
        {fSet?.typeOfOpening !== 'type-3' && (
          <>
            <StyledP>Сторона петель</StyledP>
            <Radio.Group
              onChange={onChangeRadio}
              value={fSet?.sideOfHinge}
            >
              <Radio value="left">Ліворуч</Radio>
              <Radio value="right">Праворуч</Radio>
            </Radio.Group>
          </>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width={260}
        mt={10}
      >
        <Select
          onChange={handleChangeSelect}
          options={getPVСSystemSelectOpions(fSet)}
          listHeight={170}
          style={{ width: '260px' }}
          // value =
        />
      </Box>
    </Box>
  );
};
