import { useEffect, useState } from 'react';
import { StyledControlButton } from './СontrolButtons.styled';
import IconOptions from '../../img/options.svg';
import IconTypeOfWindow from '../../img/type-of-window.svg';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconVorneLogo from '../../img/vorne-logo.svg';
import IconWinkhausLogo from '../../img/winkhaus-logo.svg';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Box } from '../Box/Box';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/ui-utills/getSetById';
import { IFSet } from '@/interfaces/interfaces';
import { getValidateStatusOfWidthOrHeight } from '@/utils/ui-utills/getValidateStatusOfWidthOrHeight';
import { height } from 'styled-system';

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

  const onClickRemoveButton = (id: string) => {
    setFSetsArray(prev => prev.filter(set => set.id !== id));
  };

  return (
    <Box display="flex" flexDirection="column">
      <StyledControlButton
        size="large"
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(1);
        }}
        icon={
          fSet?.brand === 'maco' ? (
            <IconMacoLogo width={32} height={32} />
          ) : fSet?.brand === 'vorne' ? (
            <IconVorneLogo width={32} />
          ) : fSet?.brand === 'winkhaus' ? (
            <IconWinkhausLogo width={32} />
          ) : null
        }
      />

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

      <StyledControlButton
        onClick={() => onClickRemoveButton(id)}
        icon={<RiDeleteBin2Line size={32} />}
      />
    </Box>
  );
};
