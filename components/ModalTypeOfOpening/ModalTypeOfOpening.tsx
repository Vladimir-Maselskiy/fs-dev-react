import React from 'react';
import { Select, Space } from 'antd';
import { typeOfOpeningSelectOpions } from '@/const';

type TProps = {
  id: string;
};

export const ModalTypeOfOpening = ({ id }: TProps) => {
  return (
    <Space style={{ marginTop: '10px' }} wrap>
      <p>Прижим зі сторони петель</p>
      <Select
        defaultValue={typeOfOpeningSelectOpions[0]}
        style={{ width: 200 }}
        //   onChange={handleChange}
        options={typeOfOpeningSelectOpions}
        listHeight={150}
      />
    </Space>
  );
};
