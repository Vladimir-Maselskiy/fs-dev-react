import React, { useState, useEffect } from 'react';
import { Form, Radio, Select } from 'antd';
import { getPVСSystemSelectOpions } from '@/utils/ui-utills/getPVСSystemSelectOpions';
import { Box } from '../Box/Box';
import { getPVCSystemSelectValue } from '@/utils/ui-utills/getPVCSystemSelectValue';
import { willSelectValueChange } from '@/utils/ui-utills/willSelectValueChange';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
};

export const ImportantSetsOptions = ({ fSet, setFSet }: TProps) => {
  const [selectOptions, setSelectOptions] = useState(
    getPVСSystemSelectOpions(fSet?.brand)
  );

  const [selectValue, setSelectValue] = useState(getPVCSystemSelectValue(fSet));

  useEffect(() => {
    setSelectOptions(getPVСSystemSelectOpions(fSet?.brand));
    if (willSelectValueChange(fSet?.brand, selectValue)) {
      const currentSelectValue = getPVСSystemSelectOpions(fSet?.brand)?.[0];
      setSelectValue(currentSelectValue);
    }
  }, [fSet?.brand, selectValue]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        {fSet?.typeOfOpening !== 'type-3' && (
          <Form.Item
            label="Сторона петель"
            name="sideOfHinge"
            initialValue={fSet.sideOfHinge}
          >
            <Radio.Group>
              <Radio value="left">Ліворуч</Radio>
              <Radio value="right">Праворуч</Radio>
            </Radio.Group>
          </Form.Item>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" width={260} mt={10}>
        <Form.Item label="" name="systemOfPVC" initialValue={selectValue}>
          <Select
            options={selectOptions}
            listHeight={170}
            style={{ width: '260px' }}
          />
        </Form.Item>
      </Box>
    </Box>
  );
};
