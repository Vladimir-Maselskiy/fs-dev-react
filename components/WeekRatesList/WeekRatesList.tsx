import React, { useEffect } from 'react';
import { TWeekRates } from '../CurrentRate/CurrentRate';
import { StyledItem, StyledList } from './WeekRatesList.styled';
import { Box } from '../Box/Box';
import { Rate } from '@/models/rateModel';
import { connectMongo } from '@/utils/mongo/connectMongo';

type TProps = {
  weekRates: TWeekRates[];
};

const weekDays = {
  '1': 'Понеділок',
  '2': 'Вівторок',
  '3': 'Середа',
  '4': 'Четвер',
  '5': "П'ятниця",
};

export const WeekRatesList = ({ weekRates }: TProps) => {
  return (
    <StyledList>
      {weekRates.map((rate, index) => {
        const day = String(new Date(rate.createdAt).getDay()) as
          | '1'
          | '2'
          | '3'
          | '4'
          | '5';
        return (
          <StyledItem key={index}>
            <Box display={'flex'}>
              <span style={{ width: 100 }}>{weekDays[day]}</span>
              <span>{rate.euroRate}</span>
            </Box>
          </StyledItem>
        );
      })}
    </StyledList>
  );
};
