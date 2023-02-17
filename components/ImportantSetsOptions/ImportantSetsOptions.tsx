import React, { useState, useEffect } from 'react';
import { Radio, RadioChangeEvent, Select } from 'antd';
import { useFSetsContext } from '@/context/state';

import { getPVСSystemSelectOpions } from '@/utils/getPVСSystemSelectOpions';
import { getSetById } from '@/utils/getSetById';
import { Box } from '../Box/Box';
import { StyledP } from './ImportantSetsOptions.styled';
import { getPVCSystemSelectValue } from '@/utils/getPVCSystemSelectValue';
import { willSelectValueChange } from '@/utils/willSelectValueChange';
import { isStringInUnionSystemOfPVC } from '@/utils/ts-utils/isStringInUnion';
import { ALLSystemOfPVC } from '@/interfaces/interfaces';

type TProps = {
  id: string;
};

export const ImportantSetsOptions = ({ id }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState(
    getSetById(id, fSetsArray)
  );

  const [selectOptions, setSelectOptions] = useState(
    getPVСSystemSelectOpions(fSet)
  );
  const [selectValue, setSelectValue] = useState(
    getPVCSystemSelectValue(fSet)
  );

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
  }, [fSetsArray]);

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

  useEffect(() => {
    setSelectOptions(getPVСSystemSelectOpions(fSet));
    if (willSelectValueChange(fSet, selectValue)) {
      const currentSelectValue =
        getPVСSystemSelectOpions(fSet)?.[0];
      setSelectValue(currentSelectValue);
      if (currentSelectValue?.value && fSet)
        setFSetsArray(prev =>
          prev.map(set => {
            if (set.id === id)
              return {
                ...set,
                systemOfPVC: currentSelectValue?.value,
              };
            return set;
          })
        );
      // setFSet({
      //   ...fSet,
      //   systemOfPVC: currentSelectValue.value,
      // });
    }
  }, [fSet?.brand]);

  useEffect(() => {
    if (fSet)
      setFSetsArray(prev =>
        prev.map(set => {
          if (set.id === id)
            return {
              ...set,
              systemOfPVC: fSet?.systemOfPVC,
            };
          return set;
        })
      );
  }, [fSet?.systemOfPVC]);

  const onChangeRadio = (e: RadioChangeEvent) => {
    if (fSet)
      setFSet({ ...fSet, sideOfHinge: e.target.value });
  };
  const handleChangeSelect = (
    value: {
      value: string;
      label: string;
    },
    option:
      | {
          value: string;
          label: string;
        }
      | {
          value: string;
          label: string;
        }[]
  ) => {
    if (!Array.isArray(option)) {
      setSelectValue(option);
      if (
        isStringInUnionSystemOfPVC(
          option.value,
          ALLSystemOfPVC
        ) &&
        fSet
      )
        setFSet({ ...fSet, systemOfPVC: option.value });
    }
  };

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
          options={selectOptions}
          listHeight={170}
          style={{ width: '260px' }}
          value={selectValue}
        />
      </Box>
    </Box>
  );
};
