import { AppWrapper, TableWrapper } from '@/context/state';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <TableWrapper>
        <Component {...pageProps} />
      </TableWrapper>
    </AppWrapper>
  );
}
