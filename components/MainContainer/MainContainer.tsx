import { ConfigProvider, Layout } from 'antd';
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
          colorBgBase: 'aliceblue',
        },
        components: {
          InputNumber: {
            colorText: 'rgb(33, 150, 243)',
          },
        },
      }}
    >
      <StyledMainContainer>
        <Head>
          <title>FS Next</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout style={{ minWidth: 290 }}>{children}</Layout>
      </StyledMainContainer>
    </ConfigProvider>
  );
};
