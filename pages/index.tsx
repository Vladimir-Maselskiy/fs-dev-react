import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';
import { useState, useEffect } from 'react';
import FSetList from '@/components/FSetList/FSetList';
import { AddNewFSetButton } from '../components/AddNewFSetButton/AddNewFSetButton';
import { getNewSet } from '@/utils/getNewSet';
import {
  IFSet,
  IFSetsArray,
} from '@/interfaces/interfaces';
import { Box } from '@/components/Box/Box';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [fSetsArray, setFSetsArray] = useState<IFSet[]>([]);

  const addNewFSet = (): void => {
    const newSet = getNewSet(
      fSetsArray[fSetsArray.length - 1]?.id
    );
    setFSetsArray(prev => [...prev, newSet]);
  };

  useEffect(() => {
    console.log('fSetsArray.length', fSetsArray.length);
    if (fSetsArray.length === 0)
      setFSetsArray([getNewSet()]);
  }, []);

  return (
    <MainContainer>
      <Box width="100%">
        <CurrentRate />
        <FSetList fSetsArray={fSetsArray} />
        <AddNewFSetButton addNewFSet={addNewFSet}>
          Додати
        </AddNewFSetButton>
      </Box>
    </MainContainer>
  );
}
