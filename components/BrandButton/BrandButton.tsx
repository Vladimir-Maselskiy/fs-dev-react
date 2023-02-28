import React, { useState, useEffect } from 'react';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/ui-utills/getSetById';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconVorneLogo from '../../img/vorne-logo.svg';
import IconWinkhausLogo from '../../img/winkhaus-logo.svg';
import { StyledControlButton } from './BrandButton.styled';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setCurrentSetId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const BrandButton = ({
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
  return (
    <div>
      <StyledControlButton
        size="large"
        onClick={e => {
          setIsModalOpen(true);
          setCurrentSetId(id);
          setCurrentModalNumber(1);
        }}
        icon={
          fSet?.brand === 'maco' ? (
            <IconMacoLogo width={60} height={60} />
          ) : fSet?.brand === 'vorne' ? (
            <IconVorneLogo width={60} />
          ) : fSet?.brand === 'winkhaus' ? (
            <IconWinkhausLogo width={60} />
          ) : null
        }
      />
    </div>
  );
};
