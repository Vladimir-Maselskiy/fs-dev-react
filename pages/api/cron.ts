import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { setCookie } from 'cookies-next';
import { sendActivationMail } from '@/utils/mongo/sendActivationMail';
import { getUserDto } from '@/utils/mongo/getUserDto';
import { getTokens } from '@/utils/mongo/getTokens';
import { createError } from '@/utils/mongo/createError';

/**

 */
export default async function cron(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('cron job runing...');
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
