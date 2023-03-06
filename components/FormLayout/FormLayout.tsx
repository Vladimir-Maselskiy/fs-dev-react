import { ConfigProvider, Form } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import { ControlButtons } from '../ControlButtons/ControlButtons';
import { ImportantSetsOptions } from '../ImportantSetsOptions/ImportantSetsOptions';
import { QuantityOfSets } from '../QuantityOfSets/QuantityOfSets';
import { WidthAndHeightInput } from '../WidthAndHeightInput/WidthAndHeightInput';
import { useFSetsContext } from '@/context/state';
import { getSetRestrictions } from '@/utils/ui-utills/getSetRestrictions';
import { decor, TRestrictions } from '@/const';
import { Tag } from 'antd';
import { willDecorSelecteValueChange } from '@/utils/ui-utills/willDecorSelecteValueChange';
import { FormLayoutStyled } from './FormLayout.styled';
import { BrandButton } from '../BrandButton/BrandButton';
import { getIndexByFSet } from '@/utils/data-utils/getIndexByFSet';

interface TProps {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const FormLayout = ({
  fSet,
  setFSet,
  setIsModalOpen,
  setCurrentModalNumber,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isOptitionButtonDisabled, setIsOptitionButtonDisabled] =
    useState(true);

  const [restrictions, setRestrictions] = useState<TRestrictions>(
    getSetRestrictions(fSet.typeOfOpening, fSet.brand)
  );

  const [form] = Form.useForm();

  useEffect(() => {
    setRestrictions(getSetRestrictions(fSet.typeOfOpening, fSet.brand));
  }, [fSet.brand, fSet.typeOfOpening]);

  useEffect(() => {
    const shtulpGetriebe =
      fSet.brand === 'winkhaus' ? 'shtulpGetriebe' : 'latch';
    setFSetsArray(prev =>
      prev.map(set => {
        if (set.id === fSet.id)
          return {
            ...set,
            shtulpGetriebe,
          };
        return set;
      })
    );
  }, [fSet.brand, fSet.id, setFSetsArray]);

  useEffect(() => {
    if (
      fSet?.brand &&
      fSet?.decor &&
      willDecorSelecteValueChange(fSet.brand, fSet.decor)
    ) {
      const currentDecorOneOption = decor[0].value;
      setFSetsArray(prev =>
        prev.map(set => {
          if (set.id === fSet.id) {
            if (currentDecorOneOption)
              return { ...set, decor: currentDecorOneOption };
            return set;
          }

          return set;
        })
      );
    }
  }, [fSet?.brand, fSet?.decor, fSet.id, setFSetsArray]);

  const onFinishHandleSubmit = (value: any) => {};
  const onValuesChange = (value: any) => {
    if (value && fSet) {
      setFSet(prev => ({ ...prev, ...value }));
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 22,
        },
      }}
    >
      <Form
        form={form}
        onFinish={onFinishHandleSubmit}
        onValuesChange={onValuesChange}
        layout="vertical"
      >
        <FormLayoutStyled>
          <Tag style={{ alignSelf: 'start' }}>
            {getIndexByFSet(fSetsArray, fSet) + 1}
          </Tag>
          <WidthAndHeightInput
            setIsOptitionButtonDisabled={setIsOptitionButtonDisabled}
            fSet={fSet}
            setFSet={setFSet}
            restrictions={restrictions}
            form={form}
          />
          <Box display="flex" flexDirection="column" alignItems="center">
            <QuantityOfSets fSet={fSet} setFSet={setFSet} form={form} />
            <ImportantSetsOptions fSet={fSet} setFSet={setFSet} form={form} />
          </Box>
          {/* <ControlButtons
          isOptitionButtonDisabled={isOptitionButtonDisabled}
          //   setIsModalOpen={setIsModalOpen}
          id={fSet.id}
          //   setCurrentSetId={setCurrentSetId}
          //   setCurrentModalNumber={setCurrentModalNumber}
        /> */}
          <ControlButtons
            isOptitionButtonDisabled={isOptitionButtonDisabled}
            setIsModalOpen={setIsModalOpen}
            fSet={fSet}
            setFSet={setFSet}
            setCurrentModalNumber={setCurrentModalNumber}
          />
          <BrandButton
            setIsModalOpen={setIsModalOpen}
            fSet={fSet}
            setFSet={setFSet}
            setCurrentModalNumber={setCurrentModalNumber}
          />
        </FormLayoutStyled>
      </Form>
    </ConfigProvider>
  );
};
