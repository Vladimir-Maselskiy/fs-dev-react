import {
  Form,
  InputNumber,
  Checkbox,
  Radio,
  Select,
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
import { isStringInUnionTypeOfHingeSidePress } from '@/utils/ts-utils/isStringInUnion';

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
  const [microVentilation, setMicroVentilation] =
    useState(true);

  const [isGorizontalLock, setIsGorizontalLock] =
    useState(true);

  const [isWithoutBottomHinge, setIsWithoutBottomHinge] =
    useState(false);

  const [
    isGorizontalLockDisabled,
    setIsGorizontalLockDisabled,
  ] = useState(false);

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
      setMicroVentilation(fSet.microVentilation);
      setIsGorizontalLock(fSet.isGorizontalLock);
      setIsWithoutBottomHinge(fSet.isWithoutBottomHinge);
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

  useEffect(() => {
    form.setFieldsValue({ microVentilation });
    if (fSet) setFSet({ ...fSet, microVentilation });
  }, [microVentilation]);

  useEffect(() => {
    form.setFieldsValue({ isGorizontalLock });
    if (fSet) setFSet({ ...fSet, isGorizontalLock });
  }, [isGorizontalLock]);

  useEffect(() => {
    form.setFieldsValue({ isWithoutBottomHinge });
    if (fSet) setFSet({ ...fSet, isWithoutBottomHinge });
  }, [isWithoutBottomHinge]);

  useEffect(() => {
    if (
      fSet?.typeOfOpening === 'type-2' &&
      fSet.isTurnTiltGetriebe === false
    ) {
      setIsGorizontalLockDisabled(true);
    } else if (
      fSet?.typeOfOpening === 'type-5' &&
      fSet.shtulpGetriebe === 'latch'
    ) {
      setIsGorizontalLockDisabled(true);
    } else setIsGorizontalLockDisabled(false);
  }, [fSet]);

  const onChangeHanleDistance = (value: number | null) => {
    if (value) setHanleDistance(String(value));
  };
  const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
    setShtulpGetriebe(e.target.value);
  };

  const onChangeTurnTiltGetriebe = (
    e: CheckboxChangeEvent
  ) => {
    const boolean = e.target.checked;
    setIsTurnTiltGetriebe(boolean);
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
    if (
      !Array.isArray(option) &&
      isStringInUnionTypeOfHingeSidePress(
        option.value,
        ALLTypeOfHingeSidePressConst
      )
    )
      setTypeOfHingeSidePress(option.value);
  };

  const onChangeMicroVentilation = (
    e: CheckboxChangeEvent
  ) => {
    const boolean = e.target.checked;
    setMicroVentilation(boolean);
  };

  const onChangeIsGorizontalLock = (
    e: CheckboxChangeEvent
  ) => {
    const boolean = e.target.checked;
    setIsGorizontalLock(boolean);
  };

  const onChangeIsWithoutBottomHinge = (
    e: CheckboxChangeEvent
  ) => {
    const boolean = e.target.checked;
    setIsWithoutBottomHinge(boolean);
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
      {fSet?.typeOfOpening !== 'type-3' && (
        <Form.Item
          label="Висота від низу до ручки"
          name="hanleDistance"
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
      )}

      {fSet?.typeOfOpening === 'type-2' && (
        <Form.Item
          label="П/в привід, покращений прижим"
          name="isTurnTiltGetriebe"
          valuePropName="checked"
        >
          <Checkbox
            checked={isTurnTiltGetriebe}
            onChange={onChangeTurnTiltGetriebe}
            // value={isTurnTiltGetriebe}
          />
        </Form.Item>
      )}

      {fSet?.typeOfOpening === 'type-5' && (
        <Form.Item label="Штульп" name="shtulpGetriebe">
          <Radio.Group onChange={onChangeShtulpGetriebe}>
            <Radio value="shtulpGetriebe">
              Штульп-привід
            </Radio>
            <Radio value="latch">Шпінгалети</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      {typeof fSet?.typeOfOpening === 'string' &&
        ['type-2', 'type-3', 'type-5'].includes(
          fSet?.typeOfOpening
        ) && (
          <Form.Item
            label="Прижим зі сторони петель"
            name="typeOfHingeSidePress"
          >
            <Select
              onChange={handleChangeTypeOfHingeSidePress}
              options={typeOfHingeSidePressConst}
              listHeight={150}
            />
          </Form.Item>
        )}
      {typeof fSet?.typeOfOpening === 'string' &&
        ['type-1', 'type-4'].includes(
          fSet?.typeOfOpening
        ) && (
          <Form.Item
            label="Зимове провітрювання"
            name="microVentilation"
            valuePropName="checked"
          >
            <Checkbox
              checked={microVentilation}
              onChange={onChangeMicroVentilation}
            />
          </Form.Item>
        )}

      {fSet?.typeOfOpening !== 'type-3' && (
        <Form.Item
          label="Нижній горизонтальний прижим"
          name="isGorizontalLock"
          valuePropName="checked"
        >
          <Checkbox
            checked={isGorizontalLock}
            onChange={onChangeIsGorizontalLock}
            disabled={isGorizontalLockDisabled}
          />
        </Form.Item>
      )}

      {fSet?.typeOfOpening !== 'type-3' && (
        <Form.Item
          label="Без нижньої петлі"
          name="isWithoutBottomHinge"
          valuePropName="checked"
        >
          <Checkbox
            checked={isWithoutBottomHinge}
            onChange={onChangeIsWithoutBottomHinge}
          />
        </Form.Item>
      )}
      <Divider />
    </Box>
  );
};
