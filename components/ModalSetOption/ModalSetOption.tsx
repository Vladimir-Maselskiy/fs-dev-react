import { Form, InputNumber, Checkbox, Radio, Select, Divider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/ui-utills/getSetById';
import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import {
  ALLDecor,
  ALLTypeOfHingeSidePressConst,
  IFSet,
} from '@/interfaces/interfaces';
import { typeOfHingeSidePressConst } from '@/const';
import {
  isStringInUnionDecor,
  isStringInUnionTypeOfHingeSidePress,
} from '@/utils/ts-utils/isStringInUnion';
import { getOneOptionTypeOfHingeSidePress } from '@/utils/ui-utills/getOneOptionTypeOfHingeSidePress';
import { getOneOptionDecor } from '@/utils/ui-utills/getOneOptionDecor';
import { getDecorSelectOptions } from '@/utils/ui-utills/getDecorSelectOptions';

type TProps = {
  fSet: IFSet;
  form: any;
};

export const ModalSetOption = ({ fSet, form }: TProps) => {
  const [decorOptions, setDecorOptions] = useState(
    getDecorSelectOptions(fSet?.brand)
  );

  const [hanleDistanceRestrictions, setHanleDistanceRestrictions] = useState({
    min: '235',
    max: String(Number(fSet.height) - 235),
  });

  const [isGorizontalLockDisabled, setIsGorizontalLockDisabled] = useState(
    fSet.isGorizontalLock
  );

  const [isMicroVentilationDisabled, setIsMicroVentilationDisabled] = useState(
    fSet.microVentilation
  );

  const [isAntiBreakingOpenSelectDisable, setIsAntiBreakingOpenSelectDisable] =
    useState(fSet.antiBreakingOpen);

  useEffect(() => {
    form.setFieldsValue(fSet?.hanleDistance);
  }, [fSet?.hanleDistance, form]);

  useEffect(() => {
    form.setFieldsValue(fSet?.shtulpGetriebe);
  }, [fSet?.shtulpGetriebe, form]);

  useEffect(() => {
    form.setFieldsValue(fSet?.isTurnTiltGetriebe);
  }, [fSet?.isTurnTiltGetriebe, form]);

  useEffect(() => {
    form.setFieldsValue(fSet?.typeOfHingeSidePress);
  }, [fSet?.typeOfHingeSidePress, form]);

  useEffect(() => {
    form.setFieldsValue(fSet?.microVentilation);
  }, [fSet?.microVentilation, form]);

  useEffect(() => {
    form.setFieldsValue(fSet?.isGorizontalLock);
  }, [fSet?.isGorizontalLock, form]);

  useEffect(() => {
    form.setFieldsValue(fSet?.isWithoutBottomHinge);
  }, [fSet?.isWithoutBottomHinge, form]);

  useEffect(() => {
    form.setFieldsValue({
      antiBreakingOpenRadio: fSet?.antiBreakingOpen,
    });
    form.setFieldsValue({
      antiBreakingOpen: fSet?.antiBreakingOpen,
    });
  }, [fSet?.antiBreakingOpen, form]);

  // useEffect(() => {
  //   if (fSet?.typeOfOpening === 'type-2' && fSet.isTurnTiltGetriebe === false) {
  //     setIsGorizontalLockDisabled(true);
  //   } else if (
  //     fSet?.typeOfOpening === 'type-5' &&
  //     fSet.shtulpGetriebe === 'latch'
  //   ) {
  //     setIsGorizontalLockDisabled(true);
  //   } else if (fSet?.width && fSet?.width < 400) {
  //     setIsGorizontalLockDisabled(true);
  //   } else setIsGorizontalLockDisabled(false);
  // }, [
  //   fSet?.typeOfOpening,
  //   fSet?.shtulpGetriebe,
  //   fSet?.isTurnTiltGetriebe,
  //   fSet?.width,
  // ]);

  // useEffect(() => {
  //   if (fSet?.width && fSet?.width < 320) {
  //     setIsMicroVentilationDisabled(true);
  //   } else setIsMicroVentilationDisabled(false);
  // }, [fSet?.width]);

  // useEffect(() => {
  //   if (
  //     fSet?.antiBreakingOpen &&
  //     (fSet.antiBreakingOpen === 'base' || fSet.antiBreakingOpen === 'rc1')
  //   ) {
  //     setIsAntiBreakingOpenSelectDisable(false);
  //   } else setIsAntiBreakingOpenSelectDisable(true);
  // }, [fSet?.antiBreakingOpen]);

  useEffect(() => {
    form.setFieldsValue({ decor: getOneOptionDecor(fSet?.decor) });
  }, [fSet?.decor, form]);

  // const onChangeHanleDistance = (value: number | null) => {
  //   if (fSet && value != null) {
  //     const newSet = {
  //       ...fSet,
  //       hanleDistance: value,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
  //   if (fSet) {
  //     const newSet = {
  //       ...fSet,
  //       shtulpGetriebe: e.target.value,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const onChangeTurnTiltGetriebe = (e: CheckboxChangeEvent) => {
  //   if (fSet) {
  //     const newSet = {
  //       ...fSet,
  //       isTurnTiltGetriebe: e.target.checked,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const handleChangeTypeOfHingeSidePress = (
  //   value: {
  //     value: string;
  //     label: string;
  //   },
  //   option:
  //     | {
  //         value: string;
  //         label: string;
  //       }
  //     | {
  //         value: string;
  //         label: string;
  //       }[]
  // ) => {
  //   if (
  //     !Array.isArray(option) &&
  //     isStringInUnionTypeOfHingeSidePress(
  //       option.value,
  //       ALLTypeOfHingeSidePressConst
  //     )
  //   )
  //     setFSet(prev => {
  //       if (
  //         !prev ||
  //         !isStringInUnionTypeOfHingeSidePress(
  //           option.value,
  //           ALLTypeOfHingeSidePressConst
  //         )
  //       )
  //         return prev;
  //       return { ...prev, typeOfHingeSidePress: option.value };
  //     });
  // };

  // const handleChangeDecor = (
  //   value: {
  //     value: string;
  //     label: string;
  //   },
  //   option:
  //     | {
  //         value: string;
  //         label: string;
  //       }
  //     | {
  //         value: string;
  //         label: string;
  //       }[]
  // ) => {
  //   if (!Array.isArray(option) && isStringInUnionDecor(option.value, ALLDecor))
  //     if (fSet) {
  //       setFSet({ ...fSet, decor: option.value });
  //     }
  // };

  // const onChangeMicroVentilation = (e: CheckboxChangeEvent) => {
  //   if (fSet) {
  //     const newSet = {
  //       ...fSet,
  //       microVentilation: e.target.checked,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const onChangeIsGorizontalLock = (e: CheckboxChangeEvent) => {
  //   if (fSet) {
  //     const newSet = {
  //       ...fSet,
  //       isGorizontalLock: e.target.checked,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const onChangeIsWithoutBottomHinge = (e: CheckboxChangeEvent) => {
  //   if (fSet) {
  //     const boolean = e.target.checked;
  //     const newSet = {
  //       ...fSet,
  //       isWithoutBottomHinge: boolean,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const onChangeAntiBreakingOpen = (e: CheckboxChangeEvent) => {
  //   if (fSet) {
  //     setIsAntiBreakingOpenSelectDisable(!e.target.checked);
  //     const value = e.target.checked ? 'base' : false;

  //     if (value === false || value === 'base' || value === 'rc1')
  //       setFSet({ ...fSet, antiBreakingOpen: value });
  //   }
  // };

  // const onChangeAntiBreakingOpenRadio = (e: RadioChangeEvent) => {
  //   if (fSet) {
  //     const newSet = {
  //       ...fSet,
  //       antiBreakingOpen: e.target.value,
  //     };
  //     setFSet(newSet);
  //   }
  // };

  // const onClickInputNumber = (
  //   e: React.KeyboardEvent<HTMLInputElement> | undefined
  // ) => {
  //   if (e?.key === 'Enter') {
  //     e.preventDefault();
  //   }
  // };

  return (
    <Box mt={10}>
      <p>Додаткові опції комплекта:</p>
      <Box pt={20}>
        <p>
          Ширина: {fSet?.width} &nbsp; Висота: {fSet?.height}
        </p>
      </Box>
      <Divider />

      <Form.Item
        label="Декор"
        name="decor"
        initialValue={getOneOptionDecor(fSet?.decor)?.value}
      >
        <Select
          // onChange={handleChangeDecor}
          options={decorOptions}
          listHeight={150}
          style={{ width: '140px' }}
        />
      </Form.Item>

      {/* {fSet?.typeOfOpening !== 'type-3' && (
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
            <Radio value="shtulpGetriebe">Штульп-привід</Radio>
            <Radio value="latch">Шпінгалети</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      {typeof fSet?.typeOfOpening === 'string' &&
        ['type-2', 'type-3', 'type-5'].includes(fSet?.typeOfOpening) && (
          <Form.Item
            label="Прижим зі сторони петель"
            name="typeOfHingeSidePress"
            initialValue={getOneOptionTypeOfHingeSidePress(fSet)}
          >
            <Select
              onChange={handleChangeTypeOfHingeSidePress}
              options={typeOfHingeSidePressConst}
              listHeight={150}
            />
          </Form.Item>
        )}
      {typeof fSet?.typeOfOpening === 'string' &&
        ['type-1', 'type-4'].includes(fSet?.typeOfOpening) && (
          <Form.Item
            label="Зимове провітрювання"
            name="microVentilation"
            valuePropName="checked"
            initialValue={fSet?.microVentilation}
          >
            <Checkbox
              checked={fSet?.microVentilation}
              onChange={onChangeMicroVentilation}
              disabled={isMicroVentilationDisabled}
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

      {!(
        fSet?.shtulpGetriebe === 'latch' && fSet?.typeOfOpening === 'type-5'
      ) && (
        <>
          <Form.Item label="Протизламна ф-ра:">
            <Form.Item
              valuePropName="value"
              name="antiBreakingOpen"
              initialValue={fSet?.antiBreakingOpen}
            >
              <Checkbox
                checked={fSet?.antiBreakingOpen ? true : false}
                onChange={onChangeAntiBreakingOpen}
              />
            </Form.Item>

            {!isAntiBreakingOpenSelectDisable && (
              // <Form.Item
              // label="Ступінь"
              // name="antiBreakingOpenRadio"
              // valuePropName="value"
              // initialValue={fSet?.antiBreakingOpen}
              // >
              <Radio.Group
                onChange={onChangeAntiBreakingOpenRadio}
                name="antiBreakingOpenRadio"
                value={fSet?.antiBreakingOpen}
              >
                {fSet?.shtulpGetriebe === 'latch' && (
                  <Radio value="base">Базовий</Radio>
                )}
                <Radio value="rc1">RC1</Radio>
              </Radio.Group>
              // </Form.Item>
            )}
          </Form.Item> */}
      {/* </> */}
      {/* )} */}
      <Divider />
    </Box>
  );
};
