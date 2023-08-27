import { IFSet } from '@/interfaces/interfaces';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, InputNumber, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  form: FormInstance<any>;
};

export const QuantityOfSets = ({ fSet, setFSet, form }: TProps) => {
  // const [value, setValue] = useState(fSet.quantitySet);

  const onChangeCounterByClick = (num: number): void => {
    if (fSet.quantitySet <= 1 && num < 0) return;
    if (fSet.quantitySet >= 99 && num > 0) return;
    setFSet(prev => ({ ...prev, quantitySet: prev.quantitySet + num }));
  };

  useEffect(() => {
    form.setFieldValue('quantitySet', fSet.quantitySet);
  }, [fSet.quantitySet, form, setFSet]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Button
          type="default"
          style={{ minWidth: '70px', height: '50px' }}
          icon={<MinusOutlined style={{ color: 'var(--accent-color)' }} />}
          onClick={() => onChangeCounterByClick(-1)}
        ></Button>
        <Form.Item
          label="Кількість"
          name="quantitySet"
          initialValue={fSet.quantitySet}
        >
          <InputNumber
            type="number"
            inputMode="numeric"
            pattern="\d"
            min={1}
            max={99}
            controls={false}
            style={{
              position: 'relative',
              top: '-8px',
              left: '17px',
              width: '60px',
              height: '50px',
              fontSize: '30px',
            }}
          />
        </Form.Item>
        <Button
          type="default"
          style={{ minWidth: '70px', height: '50px' }}
          icon={<PlusOutlined style={{ color: 'var(--accent-color)' }} />}
          onClick={() => onChangeCounterByClick(1)}
        ></Button>
      </Box>
    </Box>
  );
};
