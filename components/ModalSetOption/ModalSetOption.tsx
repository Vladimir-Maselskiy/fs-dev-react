import {
  Form,
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Divider,
  Collapse,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import { IFSet } from '@/interfaces/interfaces';
import { typeOfHingeSidePressConst } from '@/const';
import { getOneOptionTypeOfHingeSidePress } from '@/utils/ui-utills/getOneOptionTypeOfHingeSidePress';
import { getOneOptionDecor } from '@/utils/ui-utills/getOneOptionDecor';
import { getDecorSelectOptions } from '@/utils/ui-utills/getDecorSelectOptions';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Panel } = Collapse;

type TProps = {
  fSet: IFSet;
  form: any;
};

export const ModalSetOption = ({ fSet }: TProps) => {
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
    useState(true);

  useEffect(() => {
    if (fSet?.typeOfOpening === 'type-2' && fSet.isTurnTiltGetriebe === false) {
      setIsGorizontalLockDisabled(true);
    } else if (
      fSet?.typeOfOpening === 'type-5' &&
      fSet.shtulpGetriebe === 'latch'
    ) {
      setIsGorizontalLockDisabled(true);
    } else if (fSet?.width && fSet?.width < 400) {
      setIsGorizontalLockDisabled(true);
    } else setIsGorizontalLockDisabled(false);
  }, [
    fSet.typeOfOpening,
    fSet.shtulpGetriebe,
    fSet.isTurnTiltGetriebe,
    fSet.width,
  ]);

  useEffect(() => {
    if (fSet?.width && fSet?.width < 320) {
      setIsMicroVentilationDisabled(true);
    } else setIsMicroVentilationDisabled(false);
  }, [fSet.width]);

  useEffect(() => {
    if (fSet.isAntiBreakingOpen) {
      setIsAntiBreakingOpenSelectDisable(false);
    } else setIsAntiBreakingOpenSelectDisable(true);
  }, [fSet.isAntiBreakingOpen]);

  const onChangeAntiBreakingOpen = (e: CheckboxChangeEvent) => {
    setIsAntiBreakingOpenSelectDisable(!e.target.checked);
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
      <p>Опції:</p>
      <Box pt={20}>
        <p>
          Ширина: {fSet?.width} &nbsp; Висота: {fSet?.height}
        </p>
      </Box>
      <Divider />

      {fSet?.typeOfOpening === 'type-2' && (
        <Form.Item
          label="П/в привід, покращений прижим"
          name="isTurnTiltGetriebe"
          valuePropName="checked"
          initialValue={fSet?.isTurnTiltGetriebe}
        >
          <Checkbox checked={fSet?.isTurnTiltGetriebe} />
        </Form.Item>
      )}

      {fSet?.typeOfOpening === 'type-5' && (
        <Form.Item
          label="Штульп"
          name="shtulpGetriebe"
          initialValue={fSet.shtulpGetriebe}
        >
          <Radio.Group>
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
            <Select options={typeOfHingeSidePressConst} listHeight={150} />
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
              disabled={isMicroVentilationDisabled}
            />
          </Form.Item>
        )}

      {fSet?.typeOfOpening !== 'type-3' && (
        <Form.Item
          label="Нижній горизонтальний прижим"
          name="isGorizontalLock"
          valuePropName="checked"
          initialValue={fSet.isGorizontalLock}
        >
          <Checkbox
            checked={fSet.isGorizontalLock}
            disabled={isGorizontalLockDisabled}
          />
        </Form.Item>
      )}

      <Collapse>
        <Panel header="Додатково" key="1">
          <Form.Item
            label="Декор"
            name="decor"
            initialValue={getOneOptionDecor(fSet?.decor)?.value}
          >
            <Select
              options={decorOptions}
              listHeight={150}
              style={{ width: '140px' }}
            />
          </Form.Item>

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
                stringMode={true}
                onKeyDown={onClickInputNumber}
              />
            </Form.Item>
          )}

          {fSet?.typeOfOpening !== 'type-3' && (
            <Form.Item
              label="Без нижньої петлі"
              name="isWithoutBottomHinge"
              valuePropName="checked"
              initialValue={fSet.isWithoutBottomHinge}
            >
              <Checkbox checked={fSet.isWithoutBottomHinge} />
            </Form.Item>
          )}

          {!(
            fSet?.shtulpGetriebe === 'latch' && fSet?.typeOfOpening === 'type-5'
          ) && (
            <>
              <Form.Item label="Протизламна ф-ра:">
                <Form.Item
                  valuePropName="checked"
                  name="isAntiBreakingOpen"
                  initialValue={fSet.isAntiBreakingOpen}
                >
                  <Checkbox
                    onChange={onChangeAntiBreakingOpen}
                    checked={fSet.isAntiBreakingOpen ? true : false}
                  />
                </Form.Item>

                {!isAntiBreakingOpenSelectDisable && (
                  <Form.Item
                    name="antiBreakingOpenType"
                    valuePropName="value"
                    initialValue={fSet.antiBreakingOpenType}
                  >
                    <Radio.Group name="antiBreakingOpenRadio">
                      {fSet?.shtulpGetriebe === 'latch' && (
                        <Radio value="base">Базовий</Radio>
                      )}
                      <Radio value="rc1">RC1</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
              </Form.Item>
            </>
          )}
        </Panel>
      </Collapse>

      <Divider />
    </Box>
  );
};
