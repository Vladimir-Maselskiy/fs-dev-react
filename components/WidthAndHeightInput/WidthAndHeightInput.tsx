import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import { useFSetsContext } from '@/context/state';
import { InputNumber } from 'antd';
import { getSetById } from '@/utils/getSetById';
import { getValidateStatus } from '@/utils/getValidateStatus';

type TProps = {
  id: string;
  setIsOptitionButtonDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  restrictions: {
    minWith: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
  };
};

export const WidthAndHeightInput = ({
  id,
  setIsOptitionButtonDisabled,
  restrictions: { minWith, minHeight, maxHeight, maxWidth },
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  const [width, setWidth] = useState<number | undefined>(
    undefined
  );
  const [height, setHeight] = useState<number | undefined>(
    undefined
  );

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
    if (fSet) {
      setFSetsArray(prev =>
        prev.map(currentFSet => {
          if (fSet.id === currentFSet.id)
            return { ...currentFSet, width, height };
          return currentFSet;
        })
      );
    }
  }, [width, height]);

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
  }, [fSetsArray]);

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
  }, [fSetsArray]);

  useEffect(() => {
    if (
      fSet?.isWidthValid === 'valid' &&
      fSet.isHeightValid === 'valid'
    ) {
      setIsOptitionButtonDisabled(false);
    } else setIsOptitionButtonDisabled(true);
  }, [fSet?.isWidthValid, fSet?.isHeightValid]);

  const onChangeWidthInput = (value: number | null) => {
    if (value) {
      setWidth(value);
    }
  };
  const onChangeHeightInput = (value: number | null) => {
    if (value) {
      setHeight(value);
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
    if (fSet)
      setFrontStatusWidthInput(
        getValidateStatus(fSet, 'width', {
          minWith,
          minHeight,
          maxHeight,
          maxWidth,
        })
      );
  };
  const onBlurHeightInput = () => {
    if (fSet)
      setFrontStatusHeightInput(
        getValidateStatus(fSet, 'height', {
          minWith,
          minHeight,
          maxHeight,
          maxWidth,
        })
      );
  };

  return (
    <Box>
      <Box>
        <p>Ширина</p>
        <InputNumber
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
          value={width}
          status={frontStatusWidthInput}
        />
      </Box>
      <Box mt={10}>
        <p>Висота</p>
        <InputNumber
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
          value={height}
          status={frontStatusHeightInput}
        />
      </Box>
    </Box>
  );
};
