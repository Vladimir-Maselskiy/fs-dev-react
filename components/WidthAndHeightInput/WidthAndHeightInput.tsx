import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import { Form, FormInstance, InputNumber } from 'antd';
import { getValidateStatus } from '@/utils/ui-utills/getValidateStatus';
import { getValidateStatusOfWidthOrHeight } from '@/utils/ui-utills/getValidateStatusOfWidthOrHeight';
import { getSetRestrictions } from '@/utils/ui-utills/getSetRestrictions';
import { TRestrictions } from '@/const';
import { getCurrentIsGorizontalLock } from '@/utils/ui-utills/getCurrentIsGorizontalLock';
import { IFSet } from '@/interfaces/interfaces';
import { width } from 'styled-system';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  setIsOptitionButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  restrictions: TRestrictions;
  form: FormInstance<any>;
};

export const WidthAndHeightInput = ({
  fSet,
  setFSet,
  setIsOptitionButtonDisabled,
  restrictions,
  form,
}: TProps) => {
  const widthInputRef = useRef<HTMLInputElement>(null);
  const heihtInputRef = useRef<HTMLInputElement>(null);

  const [frontStatusWidthInput, setFrontStatusWidthInput] = useState<
    undefined | 'error'
  >(undefined);
  const [frontStatusHeightInput, setFrontStatusHeightInput] = useState<
    undefined | 'error'
  >(undefined);

  useEffect(() => {
    if (fSet?.width) {
      const status = getValidateStatus(fSet.width, 'width', restrictions);
      setFrontStatusWidthInput(status);
      const isWidthValid =
        getValidateStatusOfWidthOrHeight(
          fSet.brand,
          fSet.typeOfOpening,
          fSet.width,
          'width'
        ) === undefined
          ? 'valid'
          : 'invalid';
      const isGorizontalLock = getCurrentIsGorizontalLock(
        fSet?.width,
        fSet?.typeOfOpening,
        fSet?.brand
      );
      let microVentilation = true;
      if (fSet?.width && fSet?.width < 320) microVentilation = false;
      setFSet(prev => ({
        ...prev,
        isGorizontalLock,
        isWidthValid,
        microVentilation,
      }));
    }
  }, [fSet?.width, restrictions, fSet?.brand, fSet?.typeOfOpening, setFSet]);

  useEffect(() => {
    if (fSet?.height) {
      const status = getValidateStatus(fSet.height, 'height', restrictions);
      setFrontStatusHeightInput(status);

      const isHeightValid =
        getValidateStatusOfWidthOrHeight(
          fSet.brand,
          fSet.typeOfOpening,
          fSet.height,
          'height'
        ) === undefined
          ? 'valid'
          : 'invalid';

      setFSet(prev => ({
        ...prev,
        isHeightValid,
      }));
    }
  }, [fSet?.height, restrictions, fSet?.brand, fSet?.typeOfOpening, setFSet]);

  useEffect(() => {
    if (fSet?.isWidthValid === 'valid' && fSet.isHeightValid === 'valid') {
      setIsOptitionButtonDisabled(false);
    } else setIsOptitionButtonDisabled(true);
  }, [fSet?.isWidthValid, fSet?.isHeightValid, setIsOptitionButtonDisabled]);

  useEffect(() => {
    if (fSet?.width && fSet.height) {
      const widthStatus = getValidateStatus(
        fSet.width,
        'width',
        getSetRestrictions(fSet.typeOfOpening, fSet.brand)
      );
      setFrontStatusWidthInput(widthStatus);
      const heightStatus = getValidateStatus(
        fSet.height,
        'height',
        getSetRestrictions(fSet.typeOfOpening, fSet.brand)
      );
      setFrontStatusHeightInput(heightStatus);
    }
  }, [fSet?.typeOfOpening, fSet?.brand, fSet?.height, fSet?.width]);

  useEffect(() => {
    form.setFieldValue('width', fSet.width);
  }, [fSet.width, form]);
  useEffect(() => {
    form.setFieldValue('height', fSet.height);
  }, [fSet.height, form]);

  const onPressEnterWidth = (e: any) => {
    widthInputRef?.current?.blur();
    heihtInputRef?.current?.focus();
  };
  const onPressEnterHeight = (e: any) => {
    heihtInputRef?.current?.blur();
  };

  const onBlurWidthInput = () => {
    if (fSet) {
      const status = getValidateStatus(fSet.width, 'width', restrictions);
      setFrontStatusWidthInput(status);
    }
  };
  const onBlurHeightInput = () => {
    if (fSet) {
      const status = getValidateStatus(fSet.height, 'height', restrictions);
      setFrontStatusHeightInput(status);
    }
  };

  return (
    <Box
      width="100%"
      maxWidth="400px"
      display="flex"
      justifyContent="space-around"
      marginTop="30px"
    >
      <Box>
        <Form.Item label="Ширина" name="width" initialValue={fSet.width}>
          <InputNumber
            type="number"
            inputMode="numeric"
            pattern="\d"
            ref={widthInputRef}
            min={restrictions.minWith}
            max={restrictions.maxWidth}
            style={{
              width: '110px',
              height: '50px',
              fontSize: '30px',
              paddingTop: '10px',
            }}
            // onChange={onChangeWidthInput}
            onPressEnter={onPressEnterWidth}
            onBlur={onBlurWidthInput}
            value={fSet?.width}
            status={frontStatusWidthInput}
          />
        </Form.Item>
      </Box>
      <Box>
        <Form.Item label="Висота" name="height" initialValue={fSet?.height}>
          <InputNumber
            type="number"
            inputMode="numeric"
            pattern="\d"
            ref={heihtInputRef}
            min={restrictions.minHeight}
            max={restrictions.maxHeight}
            style={{
              width: '110px',
              height: '50px',
              fontSize: '30px',
              paddingTop: '10px',
            }}
            // onChange={onChangeHeightInput}
            onPressEnter={onPressEnterHeight}
            onBlur={onBlurHeightInput}
            value={fSet?.height}
            status={frontStatusHeightInput}
          />
        </Form.Item>
      </Box>
    </Box>
  );
};
