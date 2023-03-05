import { useState, useEffect, useRef } from 'react';
import { Button, Divider } from 'antd';
// import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from '@next/font/google';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';
import { getNewSet } from '@/utils/data-utils/getNewSet';
import { Box } from '@/components/Box/Box';
import { useFSetsContext } from '@/context/state';
import { ModalLayout } from '@/components/ModalLayout/ModalLayout';
import { CurrentModal } from '@/components/CurrentModal/CurrentModal';
import { getIsGetOrderButtonDisabled } from '@/utils/ui-utills/getIsGetOrderButtonDisabled';
import { FSetsOrderTable } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { getFSets } from '@/utils/data-utils/getFSets';
import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { FormLayout } from '@/components/FormLayout/FormLayout';
import { FSetsListTable } from '@/components/FSetsListTable/FSetsListTable';
import { ButtonStyled } from '@/components/FormLayout/FormLayout.styled';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [currentModalNumber, setCurrentModalNumber] = useState(0);
  const [tableSets, setTableSets] = useState<IArticleItem[]>([]);
  const [fSet, setFSet] = useState(getNewSet());
  const [lastID, setLastId] = useState(fSet.id);

  const [isGetOrderButtonDisabled, setIsGetOrderButtonDisabled] =
    useState(true);

  const fSetEndRef = useRef<null | HTMLElement>(null);

  const scrollToBottom = () => {
    fSetEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   setIsGetOrderButtonDisabled(getIsGetOrderButtonDisabled(fSetsArray));
  // }, [fSetsArray]);

  useEffect(() => {
    if (fSet?.isWidthValid === 'valid' && fSet.isHeightValid === 'valid') {
      setIsAddButtonDisabled(false);
    } else setIsAddButtonDisabled(true);
  }, [fSet.isWidthValid, fSet.isHeightValid]);

  const onClickCountSets = () => {
    const sets = getFSets(fSetsArray);
    setTableSets(sets);
  };

  const onClickAddSet = () => {
    const index = fSetsArray.indexOf(fSet);
    if (index === -1) {
      const currentId = fSet.id;
      setLastId(currentId);
      console.log('currentId', currentId);
      setFSetsArray(prev => [...prev, fSet]);
      setFSet(
        getNewSet({ id: (+currentId + 1).toString(), brand: fSet.brand })
      );
    }
  };

  return (
    <MainContainer>
      {/* <FSetList
        fSetsArray={fSetsArray}
        setIsModalOpen={setIsModalOpen}
        setCurrentSetId={setCurrentSetId}
        setCurrentModalNumber={setCurrentModalNumber}
      /> */}
      <Box p="10px">
        <Box>
          <CurrentRate />
        </Box>
        <FormLayout
          fSet={fSet}
          setFSet={setFSet}
          setIsModalOpen={setIsModalOpen}
          setCurrentModalNumber={setCurrentModalNumber}
        ></FormLayout>
        <ButtonStyled
          onClick={onClickAddSet}
          type="primary"
          disabled={isAddButtonDisabled}
        >
          Додати
        </ButtonStyled>
        <Divider />

        {fSetsArray.length > 0 && (
          <>
            <FSetsListTable />
            <Box mt={10} display="flex" justifyContent="space-between">
              <Button
                type="primary"
                disabled={isGetOrderButtonDisabled}
                onClick={onClickCountSets}
                style={{ marginLeft: 'auto' }}
              >
                Розрахувати
              </Button>
            </Box>
          </>
        )}
        <Divider />
        <FSetsOrderTable tableSets={tableSets} />
        <ModalLayout
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          currentModal={CurrentModal}
          modalNumber={currentModalNumber}
          fSet={fSet}
          setFSet={setFSet}
        />
        {/* <TestComonent /> */}
      </Box>
    </MainContainer>
  );
}
