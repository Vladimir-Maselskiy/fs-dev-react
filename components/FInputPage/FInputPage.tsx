import React, { useState, useEffect } from 'react';
import { Button, Divider, InputNumber, Select, Spin } from 'antd';
import { getNewSet } from '@/utils/data-utils/getNewSet';
import { Box } from '@/components/Box/Box';
import {
  useFSetsContext,
  useRateContext,
  useUserContext,
} from '@/context/state';
import { ModalLayout } from '@/components/ModalLayout/ModalLayout';
import { CurrentModal } from '@/components/CurrentModal/CurrentModal';
import { FSetsOrderTable } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { getFSets } from '@/utils/data-utils/getFSets';
import { IArticleItem, TBrands } from '@/interfaces/interfaces';
import { FormLayout } from '@/components/FormLayout/FormLayout';
import { FSetsListTable } from '@/components/FSetsListTable/FSetsListTable';
import { ButtonStyled } from '@/components/FormLayout/FormLayout.styled';
import { NavBar } from '../NavBar/NavBar';
import { getIsDiscountAvailable } from '@/utils/user-data/getIsDiscountAvailable';
import { DefaultOptionType } from 'antd/es/select';
import { useRouter } from 'next/router';
import { getDataSource } from '@/utils/data-utils/getDataSource';
import { fetchMockApiStatistic } from '@/utils/api/fetchMockApiStatistic';
import { getIdForNewFSet } from '@/utils/data-utils/getIdForNewFSet';
import { LocksOptionsDrawModal } from '../LocksOptionsDrawModal/LocksOptionsDrawModal';

type TDiscountSing = 'add' | 'minus';

type TDiscount = {
  value: number;
  sign: TDiscountSing;
};

export const FInputPage = () => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const { rate } = useRateContext();
  const { user } = useUserContext();
  const router = useRouter();
  const { brand } = router.query;

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [currentModalNumber, setCurrentModalNumber] = useState(0);
  const [tableSets, setTableSets] = useState<IArticleItem[]>([]);
  const [fSet, setFSet] = useState(getNewSet({ brand: brand as TBrands }));
  const [lastID, setLastId] = useState(fSet.id);
  const [isDiscountAviable, setIsDiscountAviable] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountAsProp, setDiscountAsProp] = useState(0);
  const [buttonTitle, setButtonTitle] = useState('Додати');
  const [discountSign, setDiscountSign] = useState<TDiscountSing>('add');
  const [isModalPressLocksOptionsOpened, setIsModalPressLocksOptionsOpened] =
    useState(false);

  const [isGetOrderButtonDisabled, setIsGetOrderButtonDisabled] =
    useState(true);
  const [isOrderTableVisible, setIsOrderTableVisible] = useState(false);

  const { Option } = Select;

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

  useEffect(() => {
    setIsDiscountAviable(getIsDiscountAvailable(user));
  }, [user]);

  useEffect(() => {
    const data = localStorage.getItem('discount');
    if (data) {
      const discount: TDiscount = JSON.parse(data);
      setDiscountSign(discount.sign);
      setDiscountValue(discount.value);
    }
  }, []);

  const onClickCountSets = () => {
    const sets = getFSets(fSetsArray);
    setTableSets(sets);
    const sign = discountSign === 'add' ? 1 : -1;

    setDiscountAsProp(discountValue * sign);

    setIsOrderTableVisible(true);

    fetchMockApiStatistic({
      user,
      dataSourceWithDiscount: getDataSource(
        getFSets(fSetsArray),
        rate?.euro!,
        discountValue * sign,
        user?.price
      ),
      discount: discountValue * sign,
    });
  };

  // const onClickAddSet = () => {
  //   console.log('fSetID', fSet.id);
  // };

  const onClickAddSet = () => {
    setButtonTitle('Додати');
    const index = fSetsArray.findIndex(set => set.id === fSet.id);
    if (index === -1) {
      const currentId = fSet.id;
      setLastId(currentId);
      setFSetsArray(prev => [
        ...prev,
        { ...fSet, id: getIdForNewFSet(fSetsArray) },
      ]);
      setFSet(
        getNewSet({
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
        brand: fSet.brand,
        systemOfPVC: fSet.systemOfPVC,
      })
    );
  };

  const onDiscountInputChange = (value: number | null) => {
    if (value !== null) setDiscountValue(value);
    localStorage.setItem(
      'discount',
      JSON.stringify({ sign: discountSign, value })
    );
  };

  const onChangeSelectSign = (
    value: string,
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    if (value === 'add' || value === 'minus') {
      setDiscountSign(value);
      localStorage.setItem(
        'discount',
        JSON.stringify({ sign: value, value: discountValue })
      );
    }
  };

  const selectBefore = (
    <Select
      defaultValue={discountSign}
      style={{ width: 100 }}
      onChange={onChangeSelectSign}
    >
      <Option value="add">Знижка</Option>
      <Option value="minus">Націнка</Option>
    </Select>
  );

  return isPageLoaded ? (
    <Box p="20px">
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

      {fSetsArray.length > 0 && (
        <>
          <Divider />
          <FSetsListTable setFSet={setFSet} setButtonTitle={setButtonTitle} />
          <Box mt={10} display="flex" justifyContent="space-between">
            {isDiscountAviable && (
              <InputNumber
                addonBefore={selectBefore}
                addonAfter="%"
                value={discountValue}
                onChange={onDiscountInputChange}
                style={{ marginRight: 20 }}
                min={0}
              />
            )}
            <Button
              type="primary"
              disabled={isGetOrderButtonDisabled && !Boolean(rate?.euro)}
              onClick={onClickCountSets}
              style={{ marginLeft: 'auto' }}
            >
              Розрахувати
            </Button>
          </Box>
        </>
      )}
      {isOrderTableVisible && (
        <>
          <Divider />
          <FSetsOrderTable
            tableSets={tableSets}
            euroRate={rate?.euro!}
            discount={discountAsProp}
          />
        </>
      )}
      <ModalLayout
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentModal={CurrentModal}
        modalNumber={currentModalNumber}
        fSet={fSet}
        setFSet={setFSet}
        setIsModalPressLocksOptionsOpened={setIsModalPressLocksOptionsOpened}
      />
      <LocksOptionsDrawModal
        fSet={fSet}
        isModalOpen={isModalPressLocksOptionsOpened}
        setIsModalOpen={setIsModalPressLocksOptionsOpened}
      />
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
