import { useEffect } from 'react';
import {
  StyledContlolButtonBox,
  StyledControlButton,
} from './ControlButtons.styled';
import IconOptions from '../../img/options.svg';
import IconTypeOfWindow from '../../img/type-of-window.svg';
import { IFSet } from '@/interfaces/interfaces';
import { getValidateStatusOfWidthOrHeight } from '@/utils/ui-utills/getValidateStatusOfWidthOrHeight';

type TProps = {
  isOptitionButtonDisabled: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const ControlButtons = ({
  isOptitionButtonDisabled,
  setIsModalOpen,
  setCurrentModalNumber,
  fSet,
  setFSet,
}: TProps) => {
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
          setFSet(fSet);
          setCurrentModalNumber(2);
        }}
        icon={<IconOptions />}
      />

      <StyledControlButton
        onClick={e => {
          setIsModalOpen(true);
          setFSet(fSet);
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
