import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <MainContainer>
      <CurrentRate />
    </MainContainer>
  );
}
