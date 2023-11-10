import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import { Form, FormInstance, InputNumber } from 'antd';
import { getValidateStatus } from '@/utils/ui-utills/getValidateStatus';
import { getValidateStatusOfWidthOrHeight } from '@/utils/ui-utills/getValidateStatusOfWidthOrHeight';
import { getSetRestrictions } from '@/utils/ui-utills/getSetRestrictions';
import { TRestrictions } from '@/const';
import { getCurrentIsGorizontalLock } from '@/utils/ui-utills/getCurrentIsGorizontalLock';
import { IFSet } from '@/interfaces/interfaces';

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
    'valid' | 'invalid' | 'initial'
  >('initial');
  const [frontStatusHeightInput, setFrontStatusHeightInput] = useState<
    'valid' | 'invalid' | 'initial'
  >('initial');

  useEffect(() => {
    if (fSet?.width) {
      const isWidthValid = getValidateStatus(fSet.width, 'width', restrictions);
      setFrontStatusWidthInput(isWidthValid);

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
      const isHeightValid = getValidateStatus(
        fSet.height,
        'height',
        restrictions
      );
      setFrontStatusHeightInput(isHeightValid);

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
    console.log('useEffect fSet.isGorizontalLock', fSet.isGorizontalLock);
  }, [fSet.isGorizontalLock]);

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
      const isWidthValid = getValidateStatus(fSet.width, 'width', restrictions);
      setFrontStatusWidthInput(isWidthValid);
      setFSet(prev => ({ ...prev, isWidthValid }));
    }
  };
  const onBlurHeightInput = () => {
    if (fSet) {
      const isHeightValid = getValidateStatus(
        fSet.height,
        'height',
        restrictions
      );
      setFrontStatusHeightInput(isHeightValid);
      setFSet(prev => ({ ...prev, isHeightValid }));
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
            }}
            onPressEnter={onPressEnterWidth}
            onBlur={onBlurWidthInput}
            value={fSet?.width}
            status={frontStatusWidthInput === 'invalid' ? 'error' : undefined}
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
            }}
            onPressEnter={onPressEnterHeight}
            onBlur={onBlurHeightInput}
            value={fSet?.height}
            status={frontStatusHeightInput === 'invalid' ? 'error' : undefined}
          />
        </Form.Item>
        <button
          onClick={() => {
            console.log('fSet', fSet);
          }}
        >
          fSet
        </button>
      </Box>
    </Box>
  );
};
