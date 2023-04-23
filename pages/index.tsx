// import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
import { FInputPage } from '@/components/FInputPage/FInputPage';
import { MainContainer } from '@/components/MainContainer/MainContainer';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <MainContainer>
      <FInputPage />
    </MainContainer>
  );
}
