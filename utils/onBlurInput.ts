import { checkHeightOnSizeRestrictions } from './checkHeightOnSizeRestrictions';
import { checkWidthOnSizeRestrictions } from './checkWidthOnSizeRestrictions';
import { getSetById } from './getSetById';

export const onBlurInput = (
  e: React.FormEvent<HTMLInputElement>,
  id: string
) => {
  const currentSet = getSetById(id);
  if (currentSet) {
    const isValidWidth =
      checkWidthOnSizeRestrictions(currentSet);
    const isValidHeight =
      checkHeightOnSizeRestrictions(currentSet);
  }

  console.log('change');
};
