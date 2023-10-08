import { Rate } from '@/models/rateModel';
import { getCurrentRate } from '@/utils/api/getCurrentRate';
import { connectMongo } from '@/utils/mongo/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next';

/**

 */
export default async function cron(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  const currentDayOfWeek = date.getDay();
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  if (
    currentDayOfWeek === 0 ||
    currentDayOfWeek === 6 ||
    (currentHour > 15 && currentMinute > 1)
  ) {
    return res.status(200).send({ mes: 'rate does not updated' });
  }

  try {
    const euroRate = await getCurrentRate();
    if (euroRate && !isNaN(Number(euroRate))) {
      await connectMongo();
      const rates = await Rate.find().sort({ $natural: -1 }).limit(1);
      if (rates.length === 0) {
        await Rate.create({ euroRate });
        return res.status(200).json({ euroRate });
      }

      const lastRate = rates[0];
      if (isNaN(Number(lastRate.euroRate)) || lastRate.euroRate !== euroRate) {
        await Rate.create({ euroRate });
        return res.status(200).json({ euroRate });
      }
      const lastRateDayOfWeek = lastRate.createdAt.getDay();

      if (lastRateDayOfWeek === currentDayOfWeek) {
        return res.status(200).send({ mes: 'rate does not updated' });
      }
      await Rate.create({ euroRate });
      return res.status(200).send({ euroRate });
    }
    return res.status(200).send({ mes: 'rate does not updated' });
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
