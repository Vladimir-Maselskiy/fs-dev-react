import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Divider, Spin } from 'antd';
import { getNewSet } from '@/utils/data-utils/getNewSet';
import { Box } from '@/components/Box/Box';
import { useFSetsContext, useRateContext } from '@/context/state';
import { ModalLayout } from '@/components/ModalLayout/ModalLayout';
import { CurrentModal } from '@/components/CurrentModal/CurrentModal';
import { FSetsOrderTable } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { getFSets } from '@/utils/data-utils/getFSets';
import { IArticleItem, IUser } from '@/interfaces/interfaces';
import { FormLayout } from '@/components/FormLayout/FormLayout';
import { FSetsListTable } from '@/components/FSetsListTable/FSetsListTable';
import { ButtonStyled } from '@/components/FormLayout/FormLayout.styled';
import { NavBar } from '../NavBar/NavBar';

export const FInputPage = () => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const { rate } = useRateContext();

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [currentModalNumber, setCurrentModalNumber] = useState(0);
  const [tableSets, setTableSets] = useState<IArticleItem[]>([]);
  const [fSet, setFSet] = useState(getNewSet());
  const [lastID, setLastId] = useState(fSet.id);
  const [buttonTitle, setButtonTitle] = useState('Додати');

  const [isGetOrderButtonDisabled, setIsGetOrderButtonDisabled] =
    useState(true);
  const [isOrderTableVisible, setIsOrderTableVisible] = useState(false);

  useEffect(() => {
    setIsGetOrderButtonDisabled(
      !(fSetsArray.length > 0) || buttonTitle === 'Змінити'
    );
  }, [fSetsArray, buttonTitle]);

  useEffect(() => {
    if (fSet?.isWidthValid === 'valid' && fSet.isHeightValid === 'valid') {
      setIsAddButtonDisabled(false);
    } else setIsAddButtonDisabled(true);
  }, [fSet.isWidthValid, fSet.isHeightValid]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (buttonTitle === 'Змінити') {
      setIsGetOrderButtonDisabled(true);
    }
  }, [buttonTitle]);

  const onClickCountSets = () => {
    const sets = getFSets(fSetsArray);
    setTableSets(sets);
    setIsOrderTableVisible(true);
  };

  const onClickAddSet = () => {
    setButtonTitle('Додати');
    const index = fSetsArray.findIndex(set => set.id === fSet.id);
    if (index === -1) {
      const currentId = fSet.id;
      setLastId(currentId);
      setFSetsArray(prev => [...prev, fSet]);
      setFSet(
        getNewSet({
          id: (+currentId + 1).toString(),
          brand: fSet.brand,
          systemOfPVC: fSet.systemOfPVC,
        })
      );
      return;
    }

    setFSetsArray(prev => {
      prev.splice(index, 1, fSet);
      return [...prev];
    });
    setFSet(
      getNewSet({
        id: (+lastID + 1).toString(),
        brand: fSet.brand,
        systemOfPVC: fSet.systemOfPVC,
      })
    );
  };

  return isPageLoaded ? (
    <Box p="10px">
      <NavBar />
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
        {buttonTitle}
      </ButtonStyled>
      <Divider />

      {fSetsArray.length > 0 && (
        <>
          <FSetsListTable setFSet={setFSet} setButtonTitle={setButtonTitle} />
          <Box mt={10} display="flex" justifyContent="space-between">
            <Button
              type="primary"
              disabled={isGetOrderButtonDisabled || Boolean(rate?.euro)}
              onClick={onClickCountSets}
              style={{ marginLeft: 'auto' }}
            >
              Розрахувати
            </Button>
          </Box>
        </>
      )}
      <Divider />
      {isOrderTableVisible && (
        <FSetsOrderTable tableSets={tableSets} euroRate={rate?.euro!} />
      )}
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
  ) : (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spin size="large" spinning={!isPageLoaded} />
    </Box>
  );
};
