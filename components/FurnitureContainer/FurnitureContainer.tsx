import React from 'react';
import { Box } from '../Box/Box';
import { FurnitureNavigationBlock } from '../FurnitureNavigationBlock/FurnitureNavigationBlock';
import { useUserContext } from '@/context/state';

type TProps = {
  children: React.ReactNode;
};

export const FurnitureContainer = ({ children }: TProps) => {
  const { user } = useUserContext();
  return (
    <Box>
      {user?.status === 'admin' && <FurnitureNavigationBlock />} {children}
    </Box>
  );
};
