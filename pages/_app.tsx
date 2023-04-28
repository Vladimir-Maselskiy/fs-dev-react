import { AppWrapper, TableWrapper, UserWrapper } from '@/context/state';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <TableWrapper>
        <UserWrapper>
          <Component {...pageProps} />
        </UserWrapper>
      </TableWrapper>
    </AppWrapper>
  );
}
