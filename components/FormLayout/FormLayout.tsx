import { Button, ConfigProvider, Form } from 'antd';
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
import {
  FormLayoutStyled,
  StyledCanvasBox,
  StyledDoubleRightOutlined,
  OverFlowWrapper,
  ButtonStyled,
} from './FormLayout.styled';
import { BrandButton } from '../BrandButton/BrandButton';
import { getIndexByFSet } from '@/utils/data-utils/getIndexByFSet';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { FSetCanvas } from '../FSetCanvas/FSetCanvas';
import { getIdForNewFSet } from '@/utils/data-utils/getIdForNewFSet';
import { getNewSet } from '@/utils/data-utils/getNewSet';

interface TProps {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
  buttonTitle: string;
  setButtonTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsGetOrderButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormLayout = ({
  fSet,
  setFSet,
  setIsModalOpen,
  setCurrentModalNumber,
  buttonTitle,
  setButtonTitle,
  setIsGetOrderButtonDisabled,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isOptitionButtonDisabled, setIsOptitionButtonDisabled] =
    useState(true);
  const [isCanvasOpen, setIsCanvasOpen] = useState(true);

  const [restrictions, setRestrictions] = useState<TRestrictions>(
    getSetRestrictions(fSet.typeOfOpening, fSet.brand)
  );
  const [isListOpen, setIsListOpen] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const [form] = Form.useForm();

  useEffect(() => {
    if (buttonTitle === 'Змінити') {
      setIsGetOrderButtonDisabled(true);
    }
  }, [buttonTitle, setIsGetOrderButtonDisabled]);

  useEffect(() => {
    setIsGetOrderButtonDisabled(
      !(fSetsArray.length > 0) || buttonTitle === 'Змінити'
    );
  }, [fSetsArray, buttonTitle, setIsGetOrderButtonDisabled]);

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
    if (fSet?.isWidthValid === 'valid' && fSet.isHeightValid === 'valid') {
      setIsAddButtonDisabled(false);
    } else setIsAddButtonDisabled(true);
  }, [fSet.isWidthValid, fSet.isHeightValid]);

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

  const onControllCanvasButtonClick = () => {
    setIsCanvasOpen(prev => !prev);
  };

  const onClickAddSet = () => {
    setButtonTitle('Додати');
    const index = fSetsArray.findIndex(set => set.id === fSet.id);
    if (index === -1) {
      const currentId = fSet.id;
      // setLastId(currentId);
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
        <OverFlowWrapper>
          <FormLayoutStyled>
            <Tag style={{ alignSelf: 'start' }}>
              {getIndexByFSet(fSetsArray, fSet) + 1}
            </Tag>
            <StyledDoubleRightOutlined
              onClick={onControllCanvasButtonClick}
              icon={
                isCanvasOpen ? <DoubleLeftOutlined /> : <DoubleRightOutlined />
              }
            ></StyledDoubleRightOutlined>
            {fSet.width && fSet.height && (
              <StyledCanvasBox>
                <FSetCanvas
                  fSet={fSet}
                  setFSet={setFSet}
                  isListOpen={isListOpen}
                  setIsListOpen={setIsListOpen}
                  isCanvasOpen={isCanvasOpen}
                />
              </StyledCanvasBox>
            )}
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
          <ButtonStyled
            onClick={onClickAddSet}
            type="primary"
            disabled={isAddButtonDisabled}
          >
            {buttonTitle}
          </ButtonStyled>
        </OverFlowWrapper>
      </Form>
    </ConfigProvider>
  );
};
