import { useEffect, useState, useRef } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';
import { StyledFSetItem } from './FSetItem.styled';
import { ControlButtons } from '../СontrolButtons/СontrolButtons';
import { ImportantSetsOptions } from '../ImportantSetsOptions/ImportantSetsOptions';
import { QuantityOfSets } from '../QuantityOfSets/QuantityOfSets';
import { WidthAndHeightInput } from '../WidthAndHeightInput/WidthAndHeightInput';
import { useFSetsContext } from '@/context/state';
import { getSetRestrictions } from '@/utils/getSetRestrictions';
import { TRestrictions } from '@/const';
import { Tag } from 'antd';

interface IProp {
  fSet: IFSet;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSetId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModalNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const FSetItem = ({
  fSet,
  setIsModalOpen,
  setCurrentSetId,
  setCurrentModalNumber,
}: IProp) => {
  const widthInputRef = useRef<Array<HTMLDivElement | null>>([]);

  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [isOptitionButtonDisabled, setIsOptitionButtonDisabled] =
    useState(true);

  const [restrictions, setRestrictions] = useState<TRestrictions>(
    getSetRestrictions(fSet.typeOfOpening, fSet.brand)
  );

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

  return (
    <StyledFSetItem>
      <Tag style={{ alignSelf: 'start' }}>{fSetsArray.indexOf(fSet) + 1}</Tag>
      <WidthAndHeightInput
        setIsOptitionButtonDisabled={setIsOptitionButtonDisabled}
        id={fSet.id}
        restrictions={restrictions}
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <QuantityOfSets id={fSet.id} />
        <ImportantSetsOptions id={fSet.id} />
      </Box>
      <ControlButtons
        isOptitionButtonDisabled={isOptitionButtonDisabled}
        setIsModalOpen={setIsModalOpen}
        id={fSet.id}
        setCurrentSetId={setCurrentSetId}
        setCurrentModalNumber={setCurrentModalNumber}
      />
    </StyledFSetItem>
  );
};
