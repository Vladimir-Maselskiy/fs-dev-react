// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createError } from './utils/mongo/createError';
import { getIsTokenValid } from './utils/mongo/getIsTokenValid';
import { NextApiRequest } from 'next';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const authHeader = new Headers(req.headers).get('authorization');
  console.log('authHeader', authHeader);
  if (!authHeader) throw createError(401, 'Error user auth');
  const token = authHeader.split(' ')[1];
  if (!token) throw createError(401, 'Error user auth');
  //   try {
  //     getIsTokenValid(token, 'access');
  //   } catch (error) {
  //     throw createError(401, 'Error user auth');
  //   }
  //   return NextResponse.redirect(new URL('/123', req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/users/:userID*',
};
