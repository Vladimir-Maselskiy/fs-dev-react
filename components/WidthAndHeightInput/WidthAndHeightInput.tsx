import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import { useFSetsContext } from '@/context/state';
import { InputNumber } from 'antd';
import { getSetById } from '@/utils/getSetById';
import { getValidateStatus } from '@/utils/getValidateStatus';
import { setIsInputValid } from '@/utils/setIsInputValid';
import { StyledP } from './WidthAndHeightInput.styled';
import { getSetRestrictions } from '@/utils/getSetRestrictions';
import { TRestrictions } from '@/const';
import { getCurrentIsGorizontalLock } from '@/utils/getCurrentIsGorizontalLock';

type TProps = {
  id: string;
  setIsOptitionButtonDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  restrictions: TRestrictions;
};

export const WidthAndHeightInput = ({
  id,
  setIsOptitionButtonDisabled,
  restrictions: { minWith, minHeight, maxHeight, maxWidth },
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const widthInputRef = useRef<HTMLInputElement>(null);
  const heihtInputRef = useRef<HTMLInputElement>(null);

  const [frontStatusWidthInput, setFrontStatusWidthInput] =
    useState<undefined | 'error'>(undefined);
  const [
    frontStatusHeightInput,
    setFrontStatusHeightInput,
  ] = useState<undefined | 'error'>(undefined);

  const [fSet, setFSet] = useState(
    getSetById(id, fSetsArray)
  );

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
  }, [fSetsArray]);

  useEffect(() => {
    if (fSet) {
      const isGorizontalLock =
        getCurrentIsGorizontalLock(fSet);
      setFSetsArray(prev =>
        prev.map(currentFSet => {
          if (fSet.id === currentFSet.id)
            return {
              ...currentFSet,
              width: fSet.width,
              height: fSet.height,
              isGorizontalLock,
            };
          return currentFSet;
        })
      );
    }
  }, [fSet?.width, fSet?.height]);

  useEffect(() => {
    if (
      fSet?.isWidthValid === 'valid' &&
      fSet.isHeightValid === 'valid'
    ) {
      setIsOptitionButtonDisabled(false);
    } else setIsOptitionButtonDisabled(true);
  }, [fSet?.isWidthValid, fSet?.isHeightValid]);

  useEffect(() => {
    if (fSet?.width && fSet.height) {
      const widthStatus = getValidateStatus(
        fSet,
        'width',
        getSetRestrictions(fSet)
      );
      setFrontStatusWidthInput(widthStatus);
      const heightStatus = getValidateStatus(
        fSet,
        'height',
        getSetRestrictions(fSet)
      );
      setFrontStatusHeightInput(heightStatus);
    }
  }, [
    fSet?.typeOfOpening,
    fSet?.brand,
    fSet?.typeOfOpening,
    fSet?.brand,
  ]);

  const onChangeWidthInput = (value: number | null) => {
    if (value && fSet) {
      setFSet({ ...fSet, width: value });
    }
  };
  const onChangeHeightInput = (value: number | null) => {
    if (value && fSet) {
      setFSet({ ...fSet, height: value });
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
      const status = getValidateStatus(fSet, 'width', {
        minWith,
        minHeight,
        maxHeight,
        maxWidth,
      });
      setFrontStatusWidthInput(status);
      setIsInputValid(
        fSetsArray,
        setFSetsArray,
        fSet.id,
        'isWidthValid'
      );
    }
  };
  const onBlurHeightInput = () => {
    if (fSet) {
      const status = getValidateStatus(fSet, 'height', {
        minWith,
        minHeight,
        maxHeight,
        maxWidth,
      });
      setFrontStatusHeightInput(status);
      setIsInputValid(
        fSetsArray,
        setFSetsArray,
        fSet.id,
        'isHeightValid'
      );
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
          min={minWith}
          max={maxWidth}
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
          min={minHeight}
          max={maxHeight}
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
