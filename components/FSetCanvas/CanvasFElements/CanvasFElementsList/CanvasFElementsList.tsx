import React, { useState, useEffect } from 'react';
import {
  StyledCanvasFElementsList,
  StyledListItem,
} from './CanvasFElementsList.styled';
import { Button, List } from 'antd';
import { IFSet, IMacoLocks } from '@/interfaces/interfaces';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import Image from 'next/image';
import { Box } from '@/components/Box/Box';
import { TListFilter } from '../../FSetCanvas';
import { getLockItemMacoByArticle } from '@/utils/canvas/getLockItemMacoByArticle';
import { getTotalLengthOfOptionalLocks } from '@/utils/canvas/getTotalLengthOfOptionalLocks';

type TProps = {
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  fset: IFSet;
  listFilter: TListFilter;
  macoLocks: IMacoLocks[];
  filteredData: IMacoLocks[];
  setFilteredData: React.Dispatch<React.SetStateAction<IMacoLocks[]>>;
};

export const CanvasFElementsList = ({
  isListOpen,
  setIsListOpen,
  setFSet,
  fset: fSet,
  listFilter,
  macoLocks,
  filteredData,
  setFilteredData,
}: TProps) => {
  const [sidePropName, setSidePropName] = useState<'width' | 'height'>(
    'height'
  );
  const [optionalLockPropName, setOptionalLockPropName] = useState<
    'optionalVerticalLock' | 'optionalGorizontalLock'
  >('optionalVerticalLock');

  useEffect(() => {
    if (listFilter.side === 'gorizontal') {
      setSidePropName('width');
      setOptionalLockPropName('optionalGorizontalLock');
    }
    if (listFilter.side === 'vertical') {
      setSidePropName('height');
      setOptionalLockPropName('optionalVerticalLock');
    }
  }, [listFilter.side]);

  useEffect(() => {
    const totalLength = getTotalLengthOfOptionalLocks(
      fSet[optionalLockPropName] || []
    );
    const filteredByTotalLength = macoLocks.filter(
      item => item.length < fSet[sidePropName]! - totalLength - 50
    );
    if (fSet[optionalLockPropName]?.length! > 0) {
      const lastMacoLock = getLockItemMacoByArticle(
        fSet[optionalLockPropName]?.slice(-1)[0]!
      )!;
      const currentData = filteredByTotalLength.filter(item => {
        return item.startConnection === lastMacoLock.endConnection;
      });
      setFilteredData(currentData);
    }
    if (
      !fSet[optionalLockPropName] ||
      fSet[optionalLockPropName]?.length! === 0
    ) {
      setFilteredData(
        filteredByTotalLength.filter(item => item.startConnection === 'clip')
      );
    }
  }, [sidePropName, optionalLockPropName, setFilteredData, fSet, macoLocks]);

  const onClick = () => {
    setIsListOpen(false);
  };

  const onAddButtonClick = (article: string) => {
    setIsListOpen(false);

    setFSet(prev => ({
      ...prev,
      [optionalLockPropName]: [...(prev[optionalLockPropName] || []), article],
    }));
  };

  return (
    <StyledCanvasFElementsList
      header={
        <Button onClick={onClick} style={{ marginLeft: '80%' }}>
          Close
        </Button>
      }
      open={isListOpen}
      fset={fSet}
      dataSource={filteredData}
      renderItem={(item, index) => {
        const macoLock = item as IMacoLocks;
        return (
          <List.Item style={{ cursor: 'pointer', padding: '0 10px' }}>
            <StyledListItem>
              <Box>
                <p>{macoLock.article}</p>
                <Button onClick={() => onAddButtonClick(macoLock.article)}>
                  +
                </Button>
              </Box>
              <p style={{ width: '50%', flexShrink: 0 }}>
                {getItemNameByArticle(macoLock.article)}
              </p>
              <Box position="relative" padding={2} width="30%">
                <Image
                  src={`/articlesSVG/${macoLock.article}.svg`}
                  alt="photo"
                  fill
                  objectFit="contain"
                />
              </Box>
            </StyledListItem>
          </List.Item>
        );
      }}
    ></StyledCanvasFElementsList>
  );
};
