import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import React from 'react';

type TProps = {
  rateStatistic: 'up' | 'down' | null;
};

export const RateStatisticIcon = ({ rateStatistic }: TProps) => {
  if (!rateStatistic) return null;

  return rateStatistic === 'up' ? (
    <RiseOutlined
      style={{
        fontSize: 24,
        color: 'orange',
        marginRight: 10,
      }}
    />
  ) : (
    <FallOutlined
      style={{
        fontSize: 24,
        color: 'green',
        marginRight: 10,
      }}
    />
  );
};
