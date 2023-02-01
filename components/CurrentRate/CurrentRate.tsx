import {
  StyledCurrentRate,
  StyledSpanRate,
} from './CurrentRate.styled';
import { BiEuro } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { setStartRate } from '@/utils/setStartRate';
import { getCurrentRate } from '@/utils/getCurrentRate';
import { Oval } from 'react-loader-spinner';

export const CurrentRate = () => {
  const [rate, setRate] = useState(setStartRate());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCurrentRate().then(res => {
      if (res) {
        const rate = res.data.currentRate;
        localStorage.setItem('rate', rate);
        setRate(rate);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const rate = localStorage.getItem('rate');
    if (rate) setRate(rate);
  }, []);

  return (
    <StyledCurrentRate>
      <BiEuro size={24} />
      <StyledSpanRate>{rate}</StyledSpanRate>
      {isLoading && (
        <Oval
          height={24}
          width={24}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </StyledCurrentRate>
  );
};
