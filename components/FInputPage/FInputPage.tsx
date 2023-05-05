import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Divider, Spin } from 'antd';
import { CurrentRate } from '@/components/CurrentRate/CurrentRate';
import { getNewSet } from '@/utils/data-utils/getNewSet';
import { Box } from '@/components/Box/Box';
import { useFSetsContext, useUserContext } from '@/context/state';
import { ModalLayout } from '@/components/ModalLayout/ModalLayout';
import { CurrentModal } from '@/components/CurrentModal/CurrentModal';
import { getIsGetOrderButtonDisabled } from '@/utils/ui-utills/getIsGetOrderButtonDisabled';
import { FSetsOrderTable } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { getFSets } from '@/utils/data-utils/getFSets';
import { IArticleItem, IFSet, IUser } from '@/interfaces/interfaces';
import { FormLayout } from '@/components/FormLayout/FormLayout';
import { FSetsListTable } from '@/components/FSetsListTable/FSetsListTable';
import { ButtonStyled } from '@/components/FormLayout/FormLayout.styled';
import { setStartEuroRate } from '@/utils/rate/setStartEuroRate';
import { NextLink } from '@/components/NextLink/NextLink';
import { NextLinkStyledButton } from './FInputPage.styled';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { error } from 'console';

export const FInputPage = () => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const { user, setUser } = useUserContext();

  const [euroRate, setEuroRate] = useState(setStartEuroRate());
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

  const $api = axios.create({ withCredentials: true });
  $api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    const data = localStorage.getItem('user');
    if (data && JSON.parse(data).accessToken)
      config.headers.Authorization = `Bearer ${JSON.parse(data).accessToken}`;
    return config;
  });

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
    const data = localStorage.getItem('user');
    if (data) {
      const user: IUser = JSON.parse(data);
      if (user.accessToken)
        $api
          .get(`${process.env.NEXT_PUBLIC_API_HOST}/users/getUser`)
          .then(res => {
            const user = res.data;
            // setUser(user);
            // localStorage.setItem('user', JSON.stringify(user));
          })
          .catch(console.log);
    }
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
      <Box display="flex" justifyContent="start" alignItems="center">
        <CurrentRate euroRate={euroRate} setEuroRate={setEuroRate} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          minWidth={300}
          ml="auto"
          padding="0 30px"
        >
          <NextLink path="./account/login">Sign In</NextLink>
          <NextLinkStyledButton href="./account/register">
            Try Free
          </NextLinkStyledButton>
        </Box>
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
        {buttonTitle}
      </ButtonStyled>
      <Divider />

      {fSetsArray.length > 0 && (
        <>
          <FSetsListTable setFSet={setFSet} setButtonTitle={setButtonTitle} />
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
      {isOrderTableVisible && (
        <FSetsOrderTable tableSets={tableSets} euroRate={euroRate} />
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
