import {
  AppWrapper,
  RateWrapper,
  TableWrapper,
  UserWrapper,
} from '@/context/state';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  // console.log('session', session);
  return (
    <SessionProvider session={session}>
      <AppWrapper>
        <TableWrapper>
          <UserWrapper>
            <RateWrapper>
              <Component {...pageProps} />
            </RateWrapper>
          </UserWrapper>
        </TableWrapper>
      </AppWrapper>
    </SessionProvider>
  );
}
