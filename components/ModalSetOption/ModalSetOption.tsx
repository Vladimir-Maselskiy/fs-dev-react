import {
  Form,
  Row,
  Col,
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Space,
  Divider,
  ConfigProvider,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
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
  const [isTurnTiltGetriebe, setIsTurnTiltGetriebe] =
    useState(false);
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
      setIsTurnTiltGetriebe(fSet.isTurnTiltGetriebe);
    }
  }, [id]);

  const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
    setShtulpGetriebe(e.target.value);
  };

  const onChangeTurnTiltGetriebe = (
    e: CheckboxChangeEvent
  ) => {
    setIsTurnTiltGetriebe(prev => !prev);
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

      <Form.Item
        label="Висота від низу до ручки"
        name="hanleDistance"
        labelAlign="left"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 6 }}
      >
        <InputNumber
          min={Number(hanleDistanceRestrictions.min)}
          max={Number(hanleDistanceRestrictions.max)}
          style={{
            width: '70px',
          }}
          placeholder={String(Number(fSet?.height) / 2)}
        />
      </Form.Item>

      <Form.Item
        label="П/в привід, покращений прижим"
        name="isTurnTiltGetriebe"
        valuePropName="checked"
        labelAlign="left"
      >
        <Checkbox
          id="isTurnTiltGetriebe"
          style={{
            marginLeft: 'onChangeTurnTiltGetriebe10px',
          }}
          defaultChecked={false}
          checked={isTurnTiltGetriebe}
          onChange={onChangeTurnTiltGetriebe}
        />

        {/* </label> */}
      </Form.Item>
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
  );
};
