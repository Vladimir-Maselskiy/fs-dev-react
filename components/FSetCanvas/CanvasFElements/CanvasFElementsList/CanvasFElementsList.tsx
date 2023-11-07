import React from 'react';
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

type TProps = {
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
};

export const CanvasFElementsList = ({
  isListOpen,
  setIsListOpen,
  setFSet,
}: TProps) => {
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
      dataSource={data}
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
              <p>{getItemNameByArticle(macoLock.article)}</p>
              <Box position="relative" padding={2} minWidth="30%">
                <Image
                  src={`/articlesSVG/${macoLock.article}.svg`}
                  alt="photo"
                  fill
                />
              </Box>
            </StyledListItem>
          </List.Item>
        );
      }}
    ></StyledCanvasFElementsList>
  );
};
