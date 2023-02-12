// import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';
import { useState, useEffect } from 'react';
import FSetList from '@/components/FSetList/FSetList';
import { AddNewFSetButton } from '../components/AddNewFSetButton/AddNewFSetButton';
import { getNewSet } from '@/utils/getNewSet';
import { Box } from '@/components/Box/Box';
import { useFSetsContext } from '@/context/state';
import { ModalLayout } from '@/components/ModalLayout/ModalLayout';
import { ModalSetOption } from '@/components/ModalSetOption/ModalSetOption';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSetId, setCurrentSetId] = useState('');

  const addNewFSet = (): void => {
    const newSet = getNewSet(
      fSetsArray[fSetsArray.length - 1]?.id
    );
    setFSetsArray(prev => [...prev, newSet]);
  };

  useEffect(() => {
    if (fSetsArray.length === 0)
      setFSetsArray([getNewSet()]);
  }, []);

  return (
    <MainContainer>
      <Box width="100%">
        <CurrentRate />
        <FSetList
          fSetsArray={fSetsArray}
          setIsModalOpen={setIsModalOpen}
          setCurrentSetId={setCurrentSetId}
        />
        <AddNewFSetButton addNewFSet={addNewFSet}>
          Додати
        </AddNewFSetButton>
        {isModalOpen && (
          <ModalLayout
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          >
            <ModalSetOption id={currentSetId} />
          </ModalLayout>
        )}
      </Box>
    </MainContainer>
  );
}
