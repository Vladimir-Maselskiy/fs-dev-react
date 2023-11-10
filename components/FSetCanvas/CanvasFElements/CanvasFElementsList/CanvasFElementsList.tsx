import React, { useState, useEffect } from 'react';
import {
  StyledCanvasFElementsList,
  StyledListItem,
} from './CanvasFElementsList.styled';
import { Button, List } from 'antd';
import data from '../../../../data/locks/maco-locks.json';
import { IFSet, IMacoLocks } from '@/interfaces/interfaces';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import Image from 'next/image';
import { Box } from '@/components/Box/Box';
import { TListFilter } from '../../FSetCanvas';
import { getLockItemMaco } from '@/utils/canvas/getLockItemMaco';

type TProps = {
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  fset: IFSet;
  listFilter: TListFilter;
};

export const CanvasFElementsList = ({
  isListOpen,
  setIsListOpen,
  setFSet,
  fset: fSet,
  listFilter,
}: TProps) => {
  const macoLocks = data as IMacoLocks[];
  const [filteredData, setFilteredData] = useState(macoLocks);
  useEffect(() => {
    if (
      listFilter.side === 'vertical' &&
      fSet.optionalVerticalLock?.length! > 0
    ) {
      const lastMacoLock = getLockItemMaco(
        fSet.optionalVerticalLock?.slice(-1)[0]!
      ) as IMacoLocks;
      const currentData = macoLocks.filter(item => {
        return item.startConnection === lastMacoLock.endConnection;
      });
      setFilteredData(currentData);
    }
    if (
      listFilter.side === 'vertical' &&
      (!fSet.optionalVerticalLock || fSet.optionalVerticalLock?.length! === 0)
    ) {
      setFilteredData(
        macoLocks.filter(item => item.startConnection === 'clip')
      );
    }
  }, [listFilter.side, fSet.optionalVerticalLock?.length]);
  const onClick = () => {
    setIsListOpen(false);
  };

  const onAddButtonClick = (article: string) => {
    setIsListOpen(false);

    setFSet(prev => ({
      ...prev,
      optionalVerticalLock: [...(prev.optionalVerticalLock || []), article],
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
      fSet={fSet}
      dataSource={filteredData}
      renderItem={(item, index) => {
        const macoLock = item as IMacoLocks;
        return (
          <List.Item
            style={{ cursor: 'pointer', padding: '0 10px' }}
            onClick={() => {
              console.log(macoLock.article);
            }}
          >
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
                  //   style={{ position: 'absolute' }}
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
