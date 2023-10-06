import type { NextApiRequest, NextApiResponse } from 'next';

/**

 */
export default async function cron(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('cron job runing...');
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}