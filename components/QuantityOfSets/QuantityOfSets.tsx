import { IFSet } from '@/interfaces/interfaces';
import { Button, Form, FormInstance, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Box } from '../Box/Box';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  form: FormInstance<any>;
};

export const QuantityOfSets = ({ fSet, setFSet, form }: TProps) => {
  const [value, setValue] = useState(fSet.quantitySet);

  const onChangeCounterByClick = (num: number): void => {
    if (fSet.quantitySet <= 1 && num < 0) return;
    if (fSet.quantitySet >= 99 && num > 0) return;
    setValue(prev => prev + num);
  };

  useEffect(() => {
    setFSet(prev => ({ ...prev, quantitySet: value }));
    form.setFieldValue('quantitySet', value);
  }, [value]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width={180}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Button
          type="default"
          style={{ width: '50px', height: '50px' }}
          icon={<AiOutlineMinus size={40} color="var(--accent-color)" />}
          onClick={() => onChangeCounterByClick(-1)}
        ></Button>
        <Form.Item label="Кількість" name="quantitySet" initialValue={value}>
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
          />
        </Form.Item>
        <Button
          type="default"
          style={{ width: '50px', height: '50px' }}
          icon={<AiOutlinePlus size={40} color="var(--accent-color)" />}
          onClick={() => onChangeCounterByClick(1)}
        ></Button>
      </Box>
    </Box>
  );
};
