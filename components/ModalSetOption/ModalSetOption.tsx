import {
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Space,
  Divider,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/getSetById';
import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import { IFSet } from '@/interfaces/interfaces';
import { typeOfHingeSidePress } from '@/const';

type TProps = {
  id: string;
};

export const ModalSetOption = ({ id }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);
  const [
    hanleDistanceRestrictions,
    setHanleDistanceRestrictions,
  ] = useState({ min: '', max: '' });
  const [shtulpGetriebe, setShtulpGetriebe] = useState<
    'shtulpGetriebe' | 'latch'
  >('latch');

  useEffect(() => {
    const fSet = getSetById(id, fSetsArray);
    if (fSet) {
      setFSet(fSet);
      setHanleDistanceRestrictions({
        min: '235',
        max: String(Number(fSet.height) - 235),
      });
      setShtulpGetriebe(fSet.shtulpGetriebe);
    }
  }, [id]);

  const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setShtulpGetriebe(e.target.value);
  };

  return (
    <Box mt={10}>
      <p>Додаткові опції комплекта:</p>
      <Box pt={20}>
        <p>
          Ширина: {fSet?.width} &nbsp; Висота:{' '}
          {fSet?.height}
        </p>
      </Box>
      <Divider />
      <Box>
        <Box mt={10}>
          <label>
            Висота від низу до ручки:
            <InputNumber
              size="small"
              min={Number(hanleDistanceRestrictions.min)}
              max={Number(hanleDistanceRestrictions.max)}
              style={{
                width: '70px',
                marginLeft: '10px',
              }}
              placeholder={String(Number(fSet?.height) / 2)}
            />
          </label>
        </Box>
        <Box mt={10}>
          <label data-select="select">
            Поворотно-відкидний привід(покращений прижим)
            <Checkbox style={{ marginLeft: '10px' }} />
          </label>
        </Box>
        <Box mt={10}>
          <p>Штульп:</p>
          <Radio.Group
            onChange={onChangeShtulpGetriebe}
            value={shtulpGetriebe}
            style={{ marginTop: '5px' }}
          >
            <Radio value="shtulpGetriebe">Привід</Radio>
            <Radio value="latch">Шпінгалети</Radio>
          </Radio.Group>
        </Box>
        <Space style={{ marginTop: '10px' }} wrap>
          <p>Прижим зі сторони петель</p>
          <Select
            defaultValue={typeOfHingeSidePress[1]}
            style={{ width: 200 }}
            //   onChange={handleChange}
            options={typeOfHingeSidePress}
            listHeight={150}
          />
        </Space>
        <Box mt={10}>
          <label>
            Зимове провітрювання
            <Checkbox style={{ marginLeft: '10px' }} />
          </label>
        </Box>
        <Box mt={10}>
          <label data-select="select">
            Нижній горизонтальний прижим
            <Checkbox style={{ marginLeft: '10px' }} />
          </label>
        </Box>
        <Box mt={10}>
          <label>
            Без нижньої петлі
            <Checkbox style={{ marginLeft: '10px' }} />
          </label>
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};
