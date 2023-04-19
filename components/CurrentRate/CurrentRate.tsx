import { StyledCurrentRate, StyledSpanRate } from './CurrentRate.styled';
// import { BiEuro } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { setStartEuroRate } from '@/utils/rate/setStartEuroRate';
import { getCurrentEuroRate } from '@/utils/rate/getCurrentEuroRate';
import { Spin } from 'antd';
import { Box } from '../Box/Box';
import { EuroOutlined } from '@ant-design/icons';

type TProps = {
  euroRate: string;
  setEuroRate: React.Dispatch<React.SetStateAction<string>>;
};

export const CurrentRate = ({ euroRate, setEuroRate }: TProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRateRefreshed, setIsRateRefreshed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCurrentEuroRate().then(res => {
      if (res) {
        const { euroRate } = res.data;
        localStorage.setItem('euroRate', euroRate);
        setEuroRate(euroRate);
        setIsLoading(false);
        setIsRateRefreshed(true);
      }
    });
  }, [setEuroRate]);

  useEffect(() => {
    const rate = localStorage.getItem('euroRate');
    if (rate) setEuroRate(rate);
  }, [setEuroRate]);

  return (
    <StyledCurrentRate>
      <EuroOutlined
        style={{
          fontSize: 24,
          color: isLoading ? 'var(--grey-color)' : '#000000',
          marginRight: 10,
        }}
      />
      <StyledSpanRate isRateRefreshed={isRateRefreshed}>
        {euroRate}
      </StyledSpanRate>
      <Box ml="5px" pt="3px">
        <Spin spinning={isLoading} />
      </Box>
    </StyledCurrentRate>
  );
};
