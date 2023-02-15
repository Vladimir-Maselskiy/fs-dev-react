import { useEffect, useState } from 'react';
import { StyledControlButton } from './СontrolButtons.styled';
import IconOptions from '../../img/options.svg';
import IconTypeOfWindow from '../../img/type-of-window.svg';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconVorneLogo from '../../img/vorne-logo.svg';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Box } from '../Box/Box';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/getSetById';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  isOptitionButtonDisabled: boolean;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  id: string;
  setCurrentSetId: React.Dispatch<
    React.SetStateAction<string>
  >;
  setCurrentModalNumber: React.Dispatch<
    React.SetStateAction<number>
  >;
};

export const ControlButtons = ({
  isOptitionButtonDisabled,
  setIsModalOpen,
  id,
  setCurrentSetId,
  setCurrentModalNumber,
}: TProps) => {
  const { fSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);

  useEffect(() => {
    const currentSet = getSetById(id, fSetsArray);
    if (currentSet) setFSet(currentSet);
  }, [fSetsArray]);

  return (
    <Box display="flex" flexDirection="column">
      <StyledControlButton
        type="button"
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(1);
        }}
      >
        <>
          {fSet?.brand === 'maco' && (
            <IconMacoLogo width={32} height={32} />
          )}
          {fSet?.brand === 'vorne' && (
            <IconVorneLogo width={32} />
          )}
        </>
      </StyledControlButton>
      <StyledControlButton
        type="button"
        disabled={isOptitionButtonDisabled}
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(2);
        }}
      >
        <IconOptions />
      </StyledControlButton>
      <StyledControlButton
        type="button"
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(3);
        }}
      >
        <IconTypeOfWindow />
      </StyledControlButton>
      <StyledControlButton type="button">
        <RiDeleteBin2Line size={32} />
      </StyledControlButton>
    </Box>
  );
};
