import React from 'react';
import { Box } from '../Box/Box';
import { StyledLink } from './FurnitureNavigationBlock.styled';
import { useRouter } from 'next/router';

export const FurnitureNavigationBlock = () => {
  const router = useRouter();
  console.log('router', router.pathname);
  return (
    <Box display="flex" ml="auto" width={300}>
      <StyledLink
        href="/furniture/input-form?brand=maco"
        $isActive={'/furniture/input-form?brand=maco'.includes(router.pathname)}
      >
        Комплект
      </StyledLink>
      {/* <StyledLink
        href="/furniture/elements"
        $isActive={'/furniture/elements'.includes(router.pathname)}
      >
        Елементи
      </StyledLink> */}
      <StyledLink
        href="/furniture/my-orders"
        $isActive={'/furniture/my-orders'.includes(router.pathname)}
      >
        Збережені
      </StyledLink>
    </Box>
  );
};
