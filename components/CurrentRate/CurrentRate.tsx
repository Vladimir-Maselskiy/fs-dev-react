import { StyledCurrentRate, StyledSpanRate } from './CurrentRate.styled';
// import { BiEuro } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { setStartEuroRate } from '@/utils/rate/setStartEuroRate';
import { getCurrentEuroRate } from '@/utils/rate/getCurrentEuroRate';
import { Spin } from 'antd';
import { Box } from '../Box/Box';
import { EuroOutlined, RetweetOutlined } from '@ant-design/icons';
import { useRateContext } from '@/context/state';
import { IRate } from '@/interfaces/interfaces';
import { SP } from 'next/dist/shared/lib/utils';

export const CurrentRate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [euroRate, setEuroRate] = useState(setStartEuroRate());
  const { rate, setRate } = useRateContext();

  const updateCurrentRate = () => {
    setIsLoading(true);
    getCurrentEuroRate().then(res => {
      if (res) {
        const { euroRate } = res.data;
        if (euroRate) {
          localStorage.setItem('rate', JSON.stringify({ euro: euroRate }));
          setRate({ euro: euroRate });
        }
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (rate) {
      localStorage.setItem('rate', JSON.stringify(rate));
      setEuroRate(rate.euro);
    }
  }, [rate]);

  useEffect(() => {
    const data = localStorage.getItem('rate');
    if (data) {
      const rate: IRate | null = JSON.parse(data);
      if (rate?.euro) setEuroRate(rate.euro);
    }
  }, []);

  return (
    <StyledCurrentRate>
      <EuroOutlined
        style={{
          fontSize: 24,
          color: isLoading ? 'var(--grey-color)' : '#000000',
          marginRight: 10,
        }}
      />
      <StyledSpanRate isLoading={isLoading}>{euroRate}</StyledSpanRate>
      {!isLoading ? (
        <RetweetOutlined
          style={{
            fontSize: 24,
            marginLeft: 10,
          }}
          onClick={updateCurrentRate}
        />
      ) : (
        <Spin
          style={{
            marginLeft: 10,
          }}
        />
      )}
      <Box ml="5px" pt="3px">
        <Spin spinning={!Boolean(rate)} />
      </Box>
    </StyledCurrentRate>
  );
};
