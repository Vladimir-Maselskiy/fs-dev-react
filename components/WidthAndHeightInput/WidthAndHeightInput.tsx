import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import { useFSetsContext } from '@/context/state';
import { InputNumber } from 'antd';
import { getSetById } from '@/utils/getSetById';
import { getValidateStatus } from '@/utils/getValidateStatus';
import { getValidateStatusOfWidthOrHeight } from '@/utils/getValidateStatusOfWidthOrHeight';
import { StyledP } from './WidthAndHeightInput.styled';
import { getSetRestrictions } from '@/utils/getSetRestrictions';
import { TRestrictions } from '@/const';
import { getCurrentIsGorizontalLock } from '@/utils/getCurrentIsGorizontalLock';

type TProps = {
  id: string;
  setIsOptitionButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  restrictions: TRestrictions;
};

export const WidthAndHeightInput = ({
  id,
  setIsOptitionButtonDisabled,
  restrictions,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  useEffect(() => {
    widthInputRef.current?.focus();
  }, [fSetsArray.length]);

  const widthInputRef = useRef<HTMLInputElement>(null);
  const heihtInputRef = useRef<HTMLInputElement>(null);

  const [frontStatusWidthInput, setFrontStatusWidthInput] = useState<
    undefined | 'error'
  >(undefined);
  const [frontStatusHeightInput, setFrontStatusHeightInput] = useState<
    undefined | 'error'
  >(undefined);

  const [fSet, setFSet] = useState(getSetById(id, fSetsArray));

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
  }, [id, fSetsArray]);

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
      setFSetsArray(prev =>
        prev.map(set => {
          if (id === set.id)
            return {
              ...set,
              width: fSet?.width,
              isGorizontalLock,
              isWidthValid,
              microVentilation,
            };
          return set;
        })
      );
    }
  }, [
    fSet?.width,
    id,
    setFSetsArray,
    restrictions,
    fSet?.brand,
    fSet?.typeOfOpening,
  ]);

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

      setFSetsArray(prev =>
        prev.map(set => {
          if (id === set.id)
            return {
              ...set,
              height: fSet.height,
              isHeightValid,
            };
          return set;
        })
      );
    }
  }, [
    fSet?.height,
    id,
    restrictions,
    setFSetsArray,
    fSet?.brand,
    fSet?.typeOfOpening,
  ]);

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

  const onChangeWidthInput = (value: number | null) => {
    if (value && fSet) {
      setFSetsArray(prev =>
        prev.map(set => {
          if (set.id === id) return { ...set, width: value };
          return set;
        })
      );
    }
  };
  const onChangeHeightInput = (value: number | null) => {
    if (value && fSet) {
      setFSetsArray(prev =>
        prev.map(set => {
          if (set.id === id) return { ...set, height: value };
          return set;
        })
      );
    }
  };

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
    <Box>
      <Box>
        <StyledP>Ширина</StyledP>
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
          onChange={onChangeWidthInput}
          onPressEnter={onPressEnterWidth}
          onBlur={onBlurWidthInput}
          value={fSet?.width}
          status={frontStatusWidthInput}
        />
      </Box>
      <Box mt={10}>
        <StyledP>Висота</StyledP>
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
          onChange={onChangeHeightInput}
          onPressEnter={onPressEnterHeight}
          onBlur={onBlurHeightInput}
          value={fSet?.height}
          status={frontStatusHeightInput}
        />
      </Box>
    </Box>
  );
};
