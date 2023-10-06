import { StyledCurrentRate, StyledSpanRate } from './CurrentRate.styled';
// import { BiEuro } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { setStartEuroRate } from '@/utils/rate/setStartEuroRate';
import { getCurrentEuroRate } from '@/utils/rate/getCurrentEuroRate';
import { Popover, Spin } from 'antd';
import { Box } from '../Box/Box';
import { EuroOutlined, RetweetOutlined } from '@ant-design/icons';
import { useRateContext } from '@/context/state';
import { IRate } from '@/interfaces/interfaces';
import { useMediaQuery } from '@/hooks';
import axios from 'axios';
import { RateStatisticIcon } from '../RateStatisticIcon/RateStatisticIcon';
import { WeekRatesList } from '../WeekRatesList/WeekRatesList';

export type TWeekRates = {
  euroRate: string;
  createdAt: string;
};

export const CurrentRate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weekRates, setWeekRates] = useState<TWeekRates[]>([]);
  const [rateStatistic, setRateStatistic] = useState<'up' | 'down' | null>(
    null
  );

  const [euroRate, setEuroRate] = useState(setStartEuroRate());
  const { rate, setRate } = useRateContext();
  const isMoreThen580 = useMediaQuery(580);

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

  useEffect(() => {
    const getWeekRates = async () => {
      const {
        data: { weekRates },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/rates/weekRates`
      );
      setWeekRates(weekRates);
    };
    getWeekRates();
  }, []);

  useEffect(() => {
    if (weekRates.length > 2) {
      const lastRate = weekRates[0].euroRate;
      const preLastRate = weekRates[1].euroRate;
      if (lastRate > preLastRate) setRateStatistic('up');
      if (lastRate < preLastRate) setRateStatistic('down');
      if (lastRate === preLastRate) setRateStatistic(null);
    } else {
      setRateStatistic(null);
    }
  }, [weekRates]);

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

  return (
    <StyledCurrentRate>
      {isMoreThen580 && (
        <Popover
          placement="bottomLeft"
          content={<WeekRatesList weekRates={weekRates} />}
        >
          <Box>
            <RateStatisticIcon rateStatistic={rateStatistic} />
          </Box>
        </Popover>
      )}
      <EuroOutlined
        style={{
          fontSize: 24,
          color: isLoading ? 'var(--grey-color)' : '#000000',
          marginRight: 10,
        }}
      />
      <StyledSpanRate isLoading={isLoading}>{euroRate}</StyledSpanRate>
      {isMoreThen580 &&
        (!isLoading ? (
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
        ))}
      <Box ml="5px" pt="3px">
        <Spin spinning={!Boolean(rate)} />
      </Box>
    </StyledCurrentRate>
  );
};
