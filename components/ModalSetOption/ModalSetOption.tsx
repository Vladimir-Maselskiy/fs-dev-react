import {
  Form,
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Divider,
  Collapse,
  RadioChangeEvent,
  FormInstance,
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
  form: FormInstance<any>;
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
  const [isTurnTiltGetriebeChecked, setIsTurnTiltGetriebeChecked] = useState(
    fSet.isTurnTiltGetriebe ? true : false
  );
  const [shtulpGetriebeValue, setShtulpGetriebeValue] = useState(
    fSet.shtulpGetriebe
  );

  const [isMicroVentilationDisabled, setIsMicroVentilationDisabled] = useState(
    fSet.microVentilation
  );

  const [isAntiBreakingOpenSelectDisable, setIsAntiBreakingOpenSelectDisable] =
    useState(true);

  useEffect(() => {
    if (
      fSet.typeOfOpening === 'type-2' &&
      isTurnTiltGetriebeChecked === false
    ) {
      setIsGorizontalLockDisabled(true);
    } else if (
      fSet.typeOfOpening === 'type-5' &&
      shtulpGetriebeValue === 'latch'
    ) {
      setIsGorizontalLockDisabled(true);
    } else if (fSet.width && fSet.width < 400) {
      setIsGorizontalLockDisabled(true);
    } else setIsGorizontalLockDisabled(false);
  }, [
    fSet.typeOfOpening,
    shtulpGetriebeValue,
    isTurnTiltGetriebeChecked,
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

  useEffect(() => {
    if (fSet.isAntiBreakingOpen) {
      setIsGorizontalLockDisabled(true);
    }
  }, [fSet.isAntiBreakingOpen]);

  const onChangeAntiBreakingOpen = (e: CheckboxChangeEvent) => {
    const value = e.target.checked;
    setIsAntiBreakingOpenSelectDisable(!value);
    if (value) {
      form.setFieldValue('isGorizontalLock', true);
      setIsGorizontalLockDisabled(true);
    }
    if (!value) {
      setIsGorizontalLockDisabled(false);
    }
  };

  const onChangeTurnTiltGetriebeCheckbox = (e: CheckboxChangeEvent) => {
    setIsTurnTiltGetriebeChecked(e.target.checked);
  };

  const onChangeShtulpGetriebe = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setShtulpGetriebeValue(value);
    if (value === 'latch') {
      form.setFieldValue('isGorizontalLock', false);
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
      <p>??????????:</p>
      <Box pt={20}>
        <p>
          ????????????: {fSet?.width} &nbsp; ????????????: {fSet?.height}
        </p>
      </Box>
      <Divider />

      {fSet?.typeOfOpening === 'type-2' && (
        <Form.Item
          label="??/?? ????????????, ???????????????????? ????????????"
          name="isTurnTiltGetriebe"
          valuePropName="checked"
          initialValue={fSet.isTurnTiltGetriebe}
        >
          <Checkbox
            checked={fSet.isTurnTiltGetriebe}
            onChange={onChangeTurnTiltGetriebeCheckbox}
          />
        </Form.Item>
      )}

      {fSet?.typeOfOpening === 'type-5' && (
        <Form.Item
          label="????????????"
          name="shtulpGetriebe"
          initialValue={fSet.shtulpGetriebe}
        >
          <Radio.Group onChange={onChangeShtulpGetriebe}>
            <Radio value="shtulpGetriebe">????????????-????????????</Radio>
            <Radio value="latch">????????????????????</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      {typeof fSet?.typeOfOpening === 'string' &&
        ['type-2', 'type-3', 'type-5'].includes(fSet?.typeOfOpening) && (
          <Form.Item
            label="???????????? ???? ?????????????? ????????????"
            name="typeOfHingeSidePress"
            initialValue={getOneOptionTypeOfHingeSidePress(fSet)}
          >
            <Select options={typeOfHingeSidePressConst} listHeight={150} />
          </Form.Item>
        )}
      {typeof fSet?.typeOfOpening === 'string' &&
        ['type-1', 'type-4'].includes(fSet?.typeOfOpening) && (
          <Form.Item
            label="???????????? ??????????????????????????"
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
          label="???????????? ???????????????????????????? ????????????"
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
        <Panel header="??????????????????" key="1">
          <Form.Item
            label="??????????"
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
              label="???????????? ?????? ???????? ???? ??????????"
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
              label="?????? ?????????????? ??????????"
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
              <Form.Item label="?????????????????????? ??-????:">
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
                        <Radio value="base">??????????????</Radio>
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
