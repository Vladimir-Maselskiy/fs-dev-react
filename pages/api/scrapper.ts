import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const SITE = 'https://viknocenter.ua/';

type Data = {
  euroRate: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const request = (await axios.get(SITE).then(res => res.data)) as string;
  const resFullString = request;

  const start = resFullString.indexOf('<h3');
  const end = resFullString.indexOf('</h3');

  const euroRate = resFullString.slice(start, end).split(' ')[3];
  res.status(200).send({ euroRate });
}
