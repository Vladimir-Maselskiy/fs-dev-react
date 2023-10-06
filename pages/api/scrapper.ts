import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getCurrentRate } from '@/utils/api/getCurrentRate';

const SITE = 'https://viknocenter.ua/';

type Data = {
  euroRate: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    const euroRate = await getCurrentRate();
    res.status(200).send({ euroRate });
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
