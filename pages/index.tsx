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
import { CurrentModal } from '@/CurrentModal/CurrentModal';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSetId, setCurrentSetId] = useState('');
  const [currentModalNumber, setCurrentModalNumber] =
    useState(0);

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
          setCurrentModalNumber={setCurrentModalNumber}
        />
        <AddNewFSetButton addNewFSet={addNewFSet}>
          Додати
        </AddNewFSetButton>

        <ModalLayout
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        >
          <CurrentModal
            id={currentSetId}
            modalNumber={currentModalNumber}
          />
        </ModalLayout>
      </Box>
    </MainContainer>
  );
}
