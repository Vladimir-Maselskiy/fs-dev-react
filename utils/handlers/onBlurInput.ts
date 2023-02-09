import { IFSet } from '@/interfaces/interfaces';
import React from 'react';
import { checkHeightOnSizeRestrictions } from '../checkHeightOnSizeRestrictions';
import { checkWidthOnSizeRestrictions } from '../checkWidthOnSizeRestrictions';
import { getSetById } from '../getSetById';
import { setInputValidation } from '../setInputValidation';
import { setValueOfInputInFSet } from '../setValueOfInputInFSet';

export const onBlurInput = (
  e: React.FocusEvent<HTMLInputElement, Element>,
  fSet: IFSet,
  setFSetsArray: React.Dispatch<
    React.SetStateAction<IFSet[]>
  >
) => {
  const currentInput = e.target;
  if (
    currentInput.name === 'width' ||
    currentInput.name === 'height'
  ) {
    setValueOfInputInFSet(
      currentInput.value,
      fSet,
      setFSetsArray,
      currentInput.name
    );
  }
};
