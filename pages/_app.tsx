import {
  AppWrapper,
  RateWrapper,
  TableWrapper,
  UserWrapper,
} from '@/context/state';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <TableWrapper>
        <UserWrapper>
          <RateWrapper>
            <Component {...pageProps} />
          </RateWrapper>
        </UserWrapper>
      </TableWrapper>
    </AppWrapper>
  );
}
