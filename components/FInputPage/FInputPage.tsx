import React, { useState, useEffect, useRef } from 'react';
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
import { NavBar } from '../NavBar/NavBar';
import { getIsDiscountAvailable } from '@/utils/user-data/getIsDiscountAvailable';
import { DefaultOptionType } from 'antd/es/select';
import { useRouter } from 'next/router';
import { getDataSource } from '@/utils/data-utils/getDataSource';
import { fetchMockApiStatistic } from '@/utils/api/fetchMockApiStatistic';

type TDiscountSing = 'add' | 'minus';

type TDiscount = {
  value: number;
  sign: TDiscountSing;
};

export const FInputPage = () => {
  const { fSetsArray } = useFSetsContext();
  const { rate } = useRateContext();
  const { user } = useUserContext();
  const router = useRouter();
  const { brand } = router.query;

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalNumber, setCurrentModalNumber] = useState(0);
  const [tableSets, setTableSets] = useState<IArticleItem[]>([]);
  const [fSet, setFSet] = useState(getNewSet({ brand: brand as TBrands }));
  const [isDiscountAviable, setIsDiscountAviable] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountAsProp, setDiscountAsProp] = useState(0);
  const [discountSign, setDiscountSign] = useState<TDiscountSing>('add');
  const [isModalPressLocksOptionsOpened, setIsModalPressLocksOptionsOpened] =
    useState(false);
  const [buttonTitle, setButtonTitle] = useState('Додати');

  const [isGetOrderButtonDisabled, setIsGetOrderButtonDisabled] =
    useState(true);
  const [isOrderTableVisible, setIsOrderTableVisible] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  const { Option } = Select;

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

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

    boxRef.current &&
      boxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });

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
    <Box p="20px" ref={boxRef}>
      <FormLayout
        fSet={fSet}
        setFSet={setFSet}
        setIsModalOpen={setIsModalOpen}
        setCurrentModalNumber={setCurrentModalNumber}
        buttonTitle={buttonTitle}
        setButtonTitle={setButtonTitle}
        setIsGetOrderButtonDisabled={setIsGetOrderButtonDisabled}
      />

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
