import {
  Form,
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Space,
  Divider,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/getSetById';
import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import {
  ALLTypeOfHingeSidePressConst,
  IFSet,
  TTypeOfHingeSidePress,
} from '@/interfaces/interfaces';
import { typeOfHingeSidePressConst } from '@/const';
import { isStringInUnion } from '@/utils/ts-utils/isStringInUnion';

type TProps = {
  id: string;
  form: any;
};

export const ModalSetOption = ({ id, form }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);
  const [hanleDistance, setHanleDistance] = useState<
    string | undefined
  >(undefined);
  const [isTurnTiltGetriebe, setIsTurnTiltGetriebe] =
    useState(false);
  const [
    hanleDistanceRestrictions,
    setHanleDistanceRestrictions,
  ] = useState({ min: '', max: '' });
  const [shtulpGetriebe, setShtulpGetriebe] = useState<
    'shtulpGetriebe' | 'latch'
  >('latch');
  const [typeOfHingeSidePress, setTypeOfHingeSidePress] =
    useState<TTypeOfHingeSidePress>(
      'hingeSidePress-type-2'
    );

  useEffect(() => {
    const originalfSet = getSetById(id, fSetsArray);
    if (originalfSet) {
      const fSet = { ...originalfSet };
      setFSet(fSet);
      setHanleDistanceRestrictions({
        min: '235',
        max: String(Number(fSet.height) - 235),
      });
      setHanleDistance(fSet.hanleDistance);
      setShtulpGetriebe(fSet.shtulpGetriebe);
      setIsTurnTiltGetriebe(fSet.isTurnTiltGetriebe);
      setTypeOfHingeSidePress(fSet.typeOfHingeSidePress);

      console.log('fSet', fSet);
    }
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({ hanleDistance });
    if (fSet) setFSet({ ...fSet, hanleDistance });
  }, [hanleDistance]);

  useEffect(() => {
    form.setFieldsValue({ shtulpGetriebe });
    if (fSet) setFSet({ ...fSet, shtulpGetriebe });
  }, [shtulpGetriebe]);

  useEffect(() => {
    form.setFieldsValue({ isTurnTiltGetriebe });
    if (fSet) setFSet({ ...fSet, isTurnTiltGetriebe });
  }, [isTurnTiltGetriebe]);

  useEffect(() => {
    form.setFieldsValue({ typeOfHingeSidePress });
    if (fSet) setFSet({ ...fSet, typeOfHingeSidePress });
  }, [typeOfHingeSidePress]);

  const onChangeHanleDistance = (value: number | null) => {
    if (value) setHanleDistance(String(value));
  };
  const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
    setShtulpGetriebe(e.target.value);
  };

  const onChangeTurnTiltGetriebe = () => {
    setIsTurnTiltGetriebe(prev => !prev);
  };
  const handleChangeTypeOfHingeSidePress = (
    e: CheckboxChangeEvent,
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
    console.log('handleChangeTypeOfHingeSidePress', option);
    if (
      !Array.isArray(option) &&
      isStringInUnion(
        option.value,
        ALLTypeOfHingeSidePressConst
      )
    )
      setTypeOfHingeSidePress(option.value);
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
      >
        <InputNumber
          min={Number(hanleDistanceRestrictions.min)}
          max={Number(hanleDistanceRestrictions.max)}
          style={{
            width: '70px',
          }}
          placeholder={String(Number(fSet?.height) / 2)}
          onChange={onChangeHanleDistance}
          stringMode={true}
        />
      </Form.Item>

      <Form.Item
        label="П/в привід, покращений прижим"
        name="isTurnTiltGetriebe"
        labelAlign="left"
      >
        <Checkbox
          id="isTurnTiltGetriebe"
          style={{
            marginLeft: 'onChangeTurnTiltGetriebe10px',
          }}
          checked={isTurnTiltGetriebe}
          onChange={onChangeTurnTiltGetriebe}
          value={isTurnTiltGetriebe}
        />
      </Form.Item>

      <Form.Item
        label="Штульп"
        name="shtulpGetriebe"
        labelAlign="left"
      >
        <Radio.Group onChange={onChangeShtulpGetriebe}>
          <Radio value="shtulpGetriebe">
            Штульп-привід
          </Radio>
          <Radio value="latch">Шпінгалети</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Прижим зі сторони петель"
        name="typeOfHingeSidePress"
        labelAlign="left"
      >
        <Select
          style={{ width: 200 }}
          onChange={handleChangeTypeOfHingeSidePress}
          options={typeOfHingeSidePressConst}
          listHeight={150}
        />
      </Form.Item>

      <Form.Item
        label="Зимове провітрювання"
        name="typeOfHingeSidePress"
        labelAlign="left"
      >
        <Checkbox style={{ marginLeft: '10px' }} />
      </Form.Item>
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
