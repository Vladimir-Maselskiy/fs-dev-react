import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';
import { useState } from 'react';
import FSetList from '@/components/FSetList/FSetList';
import { AddNewFSetButton } from '../components/AddNewFSetButton/AddNewFSetButton';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [fSetsArray, setFSetsArray] = useState([]);
  return (
    <MainContainer>
      <>
        <CurrentRate />
        <FSetList fSetsArray={fSetsArray} />
        <AddNewFSetButton>Додати</AddNewFSetButton>
      </>
    </MainContainer>
  );
}
