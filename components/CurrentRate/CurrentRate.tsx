import { StyledCurrentRate, StyledSpanRate } from './CurrentRate.styled';
// import { BiEuro } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { setStartRate } from '@/utils/rate/setStartRate';
import { getCurrentRate } from '@/utils/rate/getCurrentRate';
import { Spin } from 'antd';
import { Box } from '../Box/Box';
import { EuroOutlined } from '@ant-design/icons';

type TProps = {
  rate: string;
  setRate: React.Dispatch<React.SetStateAction<string>>;
};

export const CurrentRate = ({ rate, setRate }: TProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRateRefreshed, setIsRateRefreshed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCurrentRate().then(res => {
      if (res) {
        const rate = res.data.currentRate;
        localStorage.setItem('rate', rate);
        setRate(rate);
        setIsLoading(false);
        setIsRateRefreshed(true);
      }
    });
  }, [setRate]);

  useEffect(() => {
    const rate = localStorage.getItem('rate');
    if (rate) setRate(rate);
  }, [setRate]);

  return (
    <StyledCurrentRate>
      <EuroOutlined
        style={{
          fontSize: 24,
          color: isLoading ? 'var(--grey-color)' : '#000000',
          marginRight: 10,
        }}
      />
      <StyledSpanRate isRateRefreshed={isRateRefreshed}>{rate}</StyledSpanRate>
      <Box ml="5px" pt="3px">
        <Spin spinning={isLoading} />
      </Box>
    </StyledCurrentRate>
  );
};
