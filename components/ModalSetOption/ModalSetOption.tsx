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
import { getCurrentIsGorizontalLock } from '@/utils/getCurrentIsGorizontalLock';
import { getOneOptionTypeOfHingeSidePress } from '@/utils/getOneOptionTypeOfHingeSidePress';
import { DefaultOptionType } from 'antd/es/select';

type TProps = {
  id: string;
  form: any;
};

export const ModalSetOption = ({ id, form }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const [fSet, setFSet] = useState(
    getSetById(id, fSetsArray)
  );

  const [
    hanleDistanceRestrictions,
    setHanleDistanceRestrictions,
  ] = useState({ min: '', max: '' });

  const [
    isGorizontalLockDisabled,
    setIsGorizontalLockDisabled,
  ] = useState(false);

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
    if (fSet) {
      setHanleDistanceRestrictions({
        min: '235',
        max: String(Number(fSet.height) - 235),
      });
    }
  }, [id, fSetsArray]);

  useEffect(() => {
    form.setFieldsValue(fSet?.hanleDistance);
  }, [fSet?.hanleDistance]);

  useEffect(() => {
    form.setFieldsValue(fSet?.shtulpGetriebe);
  }, [fSet?.shtulpGetriebe]);

  useEffect(() => {
    form.setFieldsValue(fSet?.isTurnTiltGetriebe);
  }, [fSet?.isTurnTiltGetriebe]);

  useEffect(() => {
    form.setFieldsValue(fSet?.typeOfHingeSidePress);
  }, [fSet?.typeOfHingeSidePress]);

  useEffect(() => {
    form.setFieldsValue(fSet?.microVentilation);
  }, [fSet?.microVentilation]);

  useEffect(() => {
    form.setFieldsValue(fSet?.isGorizontalLock);
  }, [fSet?.isGorizontalLock]);

  useEffect(() => {
    form.setFieldsValue(fSet?.isWithoutBottomHinge);
  }, [fSet?.isWithoutBottomHinge]);

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

  // useEffect(() => {
  //   if (fSet)
  //     setIsGorizontalLock(getCurrentIsGorizontalLock(fSet));
  // }, [fSet?.brand, fSet?.width, fSet?.typeOfOpening]);

  const onChangeHanleDistance = (value: number | null) => {
    if (fSet && value != null) {
      const newSet = {
        ...fSet,
        hanleDistance: value,
      };
      setFSet(newSet);
    }
  };

  const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
    if (fSet) {
      const newSet = {
        ...fSet,
        shtulpGetriebe: e.target.value,
      };
      setFSet(newSet);
    }
  };

  const onChangeTurnTiltGetriebe = (
    e: CheckboxChangeEvent
  ) => {
    if (fSet) {
      const newSet = {
        ...fSet,
        isTurnTiltGetriebe: e.target.checked,
      };
      setFSet(newSet);
    }
  };

  const handleChangeTypeOfHingeSidePress = (
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
    if (
      !Array.isArray(option) &&
      isStringInUnionTypeOfHingeSidePress(
        option.value,
        ALLTypeOfHingeSidePressConst
      )
    )
      if (fSet) {
        const newSet = {
          ...fSet,
          typeOfHingeSidePress: option.value,
        };
        setFSet(newSet);
      }
  };

  const onChangeMicroVentilation = (
    e: CheckboxChangeEvent
  ) => {
    if (fSet) {
      const newSet = {
        ...fSet,
        microVentilation: e.target.checked,
      };
      setFSet(newSet);
    }
  };

  const onChangeIsGorizontalLock = (
    e: CheckboxChangeEvent
  ) => {
    if (fSet) {
      const newSet = {
        ...fSet,
        isGorizontalLock: e.target.checked,
      };
      setFSet(newSet);
    }
  };

  const onChangeIsWithoutBottomHinge = (
    e: CheckboxChangeEvent
  ) => {
    if (fSet) {
      const boolean = e.target.checked;
      const newSet = {
        ...fSet,
        isWithoutBottomHinge: boolean,
      };
      setFSet(newSet);
    }
  };

  const onClickInputNumber = (
    e: React.KeyboardEvent<HTMLInputElement> | undefined
  ) => {
    if (e?.key === 'Enter') {
      e.preventDefault();
    }
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
          initialValue={fSet?.hanleDistance}
        >
          <InputNumber
            type="number"
            inputMode="numeric"
            pattern="\d"
            min={Number(hanleDistanceRestrictions.min)}
            max={Number(hanleDistanceRestrictions.max)}
            style={{
              width: '70px',
            }}
            placeholder={String(Number(fSet?.height) / 2)}
            onChange={onChangeHanleDistance}
            stringMode={true}
            onKeyDown={onClickInputNumber}
          />
        </Form.Item>
      )}

      {fSet?.typeOfOpening === 'type-2' && (
        <Form.Item
          label="П/в привід, покращений прижим"
          name="isTurnTiltGetriebe"
          valuePropName="checked"
          initialValue={fSet?.isTurnTiltGetriebe}
        >
          <Checkbox
            checked={fSet?.isTurnTiltGetriebe}
            onChange={onChangeTurnTiltGetriebe}
          />
        </Form.Item>
      )}

      {fSet?.typeOfOpening === 'type-5' && (
        <Form.Item
          label="Штульп"
          name="shtulpGetriebe"
          initialValue={fSet.shtulpGetriebe}
        >
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
            initialValue={getOneOptionTypeOfHingeSidePress(
              fSet
            )}
          >
            <Select
              onChange={handleChangeTypeOfHingeSidePress}
              options={typeOfHingeSidePressConst}
              value={getOneOptionTypeOfHingeSidePress(fSet)}
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
            initialValue={fSet?.microVentilation}
          >
            <Checkbox
              checked={fSet?.microVentilation}
              onChange={onChangeMicroVentilation}
            />
          </Form.Item>
        )}

      {fSet?.typeOfOpening !== 'type-3' && (
        <Form.Item
          label="Нижній горизонтальний прижим"
          name="isGorizontalLock"
          valuePropName="checked"
          initialValue={fSet?.isGorizontalLock}
        >
          <Checkbox
            checked={fSet?.isGorizontalLock}
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
          initialValue={fSet?.isWithoutBottomHinge}
        >
          <Checkbox
            checked={fSet?.isWithoutBottomHinge}
            onChange={onChangeIsWithoutBottomHinge}
          />
        </Form.Item>
      )}
      <Divider />
    </Box>
  );
};
