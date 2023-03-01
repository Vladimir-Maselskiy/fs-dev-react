import React from 'react';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconVorneLogo from '../../img/vorne-logo.svg';
import IconWinkhausLogo from '../../img/winkhaus-logo.svg';
import { StyledControlButton } from './BrandButton.styled';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const BrandButton = ({
  setIsModalOpen,
  fSet,
  setFSet,
  setCurrentModalNumber,
}: TProps) => {
  return (
    <div>
      <StyledControlButton
        size="large"
        onClick={e => {
          setIsModalOpen(true);
          setFSet(fSet);
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
