import { useState, useEffect, useRef } from 'react';
import { Button, Divider } from 'antd';
// import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';
import FSetList from '@/components/FSetList/FSetList';
import { getNewSet } from '@/utils/getNewSet';
import { Box } from '@/components/Box/Box';
import { useFSetsContext } from '@/context/state';
import { ModalLayout } from '@/components/ModalLayout/ModalLayout';
import { CurrentModal } from '@/CurrentModal/CurrentModal';
import { TestComonent } from '@/components/TestComonent/TestComonent';
import { getIsGetOrderButtonDisabled } from '@/utils/getIsGetOrderButtonDisabled';
import { FSetsOrderTable } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { getFSets } from '@/utils/getFSets';
import { IArticleItem } from '@/interfaces/interfaces';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSetId, setCurrentSetId] = useState('');
  const [currentModalNumber, setCurrentModalNumber] = useState(0);
  const [tableSets, setTableSets] = useState<IArticleItem[]>([]);

  const [isGetOrderButtonDisabled, setIsGetOrderButtonDisabled] =
    useState(true);

  const fSetEndRef = useRef<null | HTMLElement>(null);

  const scrollToBottom = () => {
    fSetEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const addNewFSet = (): void => {
    const newSet = getNewSet(fSetsArray[fSetsArray.length - 1]?.id);
    setFSetsArray(prev => [...prev, newSet]);
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    if (fSetsArray.length === 0) setFSetsArray([getNewSet()]);
  }, [setFSetsArray, fSetsArray.length]);

  useEffect(() => {
    setIsGetOrderButtonDisabled(getIsGetOrderButtonDisabled(fSetsArray));
  }, [fSetsArray]);

  const onClickCountSets = () => {
    const sets = getFSets(fSetsArray);
    setTableSets(sets);
  };

  return (
    <MainContainer>
      <>
        <Box width="100%" display="flex" justifyContent="space-between">
          <CurrentRate />
          <Button
            type="primary"
            disabled={isGetOrderButtonDisabled}
            onClick={onClickCountSets}
            style={{ marginLeft: 'auto' }}
          >
            Розрахувати
          </Button>
        </Box>
        <FSetList
          fSetsArray={fSetsArray}
          setIsModalOpen={setIsModalOpen}
          setCurrentSetId={setCurrentSetId}
          setCurrentModalNumber={setCurrentModalNumber}
        />
        <Box mt={10} display="flex" justifyContent="space-between">
          <Button type="primary" ref={fSetEndRef} onClick={addNewFSet}>
            Додати
          </Button>
          <Button
            type="primary"
            disabled={isGetOrderButtonDisabled}
            onClick={onClickCountSets}
            style={{ marginLeft: 'auto' }}
          >
            Розрахувати
          </Button>
        </Box>
        <Divider />
        <FSetsOrderTable tableSets={tableSets} />

        <ModalLayout
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          currentModal={CurrentModal}
          id={currentSetId}
          modalNumber={currentModalNumber}
        />

        {/* <TestComonent /> */}
      </>
    </MainContainer>
  );
}
