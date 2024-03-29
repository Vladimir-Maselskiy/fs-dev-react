import React, { useState, useEffect } from 'react';
import { Box } from '../Box/Box';
import { Divider, Spin } from 'antd';
import { NavContent } from '../NavContent/NavContent';

export const Home = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  return isPageLoaded ? (
    <Box p="20px" display="flex" flexDirection="column" height="100%">
      <NavContent />
    </Box>
  ) : (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spin size="large" spinning={!isPageLoaded} />
    </Box>
  );
};
