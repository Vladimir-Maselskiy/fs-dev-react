import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (listFilter.side === 'vertical') {
      const totalLength = getTotalLengthOfOptionalLocks(
        fSet.optionalVerticalLock || []
      );
      const filteredByTotalLength = macoLocks.filter(
        item => item.length < fSet.height! - totalLength - 50
      );
      if (fSet.optionalVerticalLock?.length! > 0) {
        const lastMacoLock = getLockItemMacoByArticle(
          fSet.optionalVerticalLock?.slice(-1)[0]!
        )!;
        const currentData = filteredByTotalLength.filter(item => {
          return item.startConnection === lastMacoLock.endConnection;
        });
        setFilteredData(currentData);
      }
      if (
        !fSet.optionalVerticalLock ||
        fSet.optionalVerticalLock?.length! === 0
      ) {
        setFilteredData(
          filteredByTotalLength.filter(item => item.startConnection === 'clip')
        );
      }
    }
  }, [
    listFilter.side,
    fSet.optionalVerticalLock?.length,
    fSet.optionalVerticalLock,
    macoLocks,
  ]);
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
      fset={fSet}
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
