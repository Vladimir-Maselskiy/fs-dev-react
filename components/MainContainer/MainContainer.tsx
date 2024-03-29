import { useEffect } from 'react';
import { ConfigProvider, Divider, Layout } from 'antd';
import { StyledMainContainer } from './MainContainer.styled';

import Head from 'next/head';
import { setStartEuroRate } from '@/utils/rate/setStartEuroRate';
import { useRateContext } from '@/context/state';
import { getCurrentEuroRate } from '@/utils/rate/getCurrentEuroRate';
import { IRate } from '@/interfaces/interfaces';
import { NavBar } from '../NavBar/NavBar';
import Snowfall from 'react-snowfall';

type Props = {
  children?: JSX.Element;
};

export const MainContainer = ({ children }: Props) => {
  const { setRate } = useRateContext();

  useEffect(() => {
    const data = localStorage.getItem('rate');
    if (data) {
      const rate: IRate | null = JSON.parse(data);
      if (rate?.euro) setRate(rate);
    } else {
      setRate({ euro: setStartEuroRate() });
    }
    getCurrentEuroRate().then(res => {
      if (res) {
        const { euroRate } = res.data;
        localStorage.setItem('rate', JSON.stringify({ euro: euroRate }));
        setRate({ euro: euroRate });
      }
    });
  }, [setRate]);

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
          <meta name="description" content="Фурнітура Maco і Vorne" />
          <meta name="google" content="notranslate"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout style={{ minWidth: 290, width: '100%', padding: 20 }}>
          <>
            {/* Сніжинки
            <Snowfall
              color="rgba(2,140,255,0.13)"
              snowflakeCount={100}
              wind={[0.5, 1]}
              radius={[0.5, 5]}
              speed={[0.5, 1]}
            /> */}
            <NavBar />
            <Divider />
            {children}
          </>
        </Layout>
      </StyledMainContainer>
    </ConfigProvider>
  );
};
