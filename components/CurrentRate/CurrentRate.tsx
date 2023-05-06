import { StyledCurrentRate, StyledSpanRate } from './CurrentRate.styled';
// import { BiEuro } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { setStartEuroRate } from '@/utils/rate/setStartEuroRate';
import { getCurrentEuroRate } from '@/utils/rate/getCurrentEuroRate';
import { Spin } from 'antd';
import { Box } from '../Box/Box';
import { EuroOutlined } from '@ant-design/icons';
import { useRateContext } from '@/context/state';
import { IRate } from '@/interfaces/interfaces';

export const CurrentRate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRateRefreshed, setIsRateRefreshed] = useState(false);
  const [euroRate, setEuroRate] = useState(setStartEuroRate());
  const { rate } = useRateContext();

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
      <StyledSpanRate isRateRefreshed={Boolean(rate)}>
        {euroRate}
      </StyledSpanRate>
      <Box ml="5px" pt="3px">
        <Spin spinning={!Boolean(rate)} />
      </Box>
    </StyledCurrentRate>
  );
};
