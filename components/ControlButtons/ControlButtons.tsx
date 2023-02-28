import { useEffect, useState } from 'react';
import {
  StyledContlolButtonBox,
  StyledControlButton,
} from './ControlButtons.styled';
import IconOptions from '../../img/options.svg';
import IconTypeOfWindow from '../../img/type-of-window.svg';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/ui-utills/getSetById';
import { IFSet } from '@/interfaces/interfaces';
import { getValidateStatusOfWidthOrHeight } from '@/utils/ui-utills/getValidateStatusOfWidthOrHeight';

type TProps = {
  isOptitionButtonDisabled: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setCurrentSetId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const ControlButtons = ({
  isOptitionButtonDisabled,
  setIsModalOpen,
  id,
  setCurrentSetId,
  setCurrentModalNumber,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);

  useEffect(() => {
    const currentSet = getSetById(id, fSetsArray);
    if (currentSet) setFSet(currentSet);
  }, [id, fSetsArray]);

  useEffect(() => {
    if (fSet?.width)
      getValidateStatusOfWidthOrHeight(
        fSet.brand,
        fSet.typeOfOpening,
        fSet.width,
        'width'
      );
    if (fSet?.height)
      getValidateStatusOfWidthOrHeight(
        fSet.brand,
        fSet.typeOfOpening,
        fSet.height,
        'height'
      );
  }, [fSet?.brand, fSet?.typeOfOpening, fSet?.width, fSet?.height]);

  return (
    <StyledContlolButtonBox>
      <StyledControlButton
        disabled={isOptitionButtonDisabled}
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(2);
        }}
        icon={<IconOptions />}
      />

      <StyledControlButton
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(3);
        }}
        icon={<IconTypeOfWindow />}
      />

      {/* <StyledControlButton
        onClick={() => onClickRemoveButton(id)}
        icon={<RiDeleteBin2Line size={32} />}
      /> */}
    </StyledContlolButtonBox>
  );
};
