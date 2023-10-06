import { Rate } from '@/models/rateModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next';

/**

 */
export default async function weekRates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const weekRates = await Rate.find().sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({ weekRates });
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
