import { Box } from '../Box/Box';
import { ConfigProvider } from 'antd';
import { StyledMainContainer } from './MainContainer.styled';

import Head from 'next/head';

type Props = {
  children?: JSX.Element;
};

export const MainContainer = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(33, 150, 243)',
        },
      }}
    >
      <StyledMainContainer>
        <Head>
          <title>FS Next</title>
          <meta
            name="description"
            content="Generated by create next app"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box p={40} width="100%" minWidth={550}>
          {children}
        </Box>
      </StyledMainContainer>
    </ConfigProvider>
  );
};
