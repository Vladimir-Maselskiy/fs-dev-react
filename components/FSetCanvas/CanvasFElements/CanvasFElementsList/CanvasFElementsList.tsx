import React from 'react';
import {
  StyledCanvasFElementsList,
  StyledListItem,
} from './CanvasFElementsList.styled';
import { Button, List } from 'antd';
import data from '../../../../data/locks/maco-locks.json';
import { IMacoLocks } from '@/interfaces/interfaces';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import Image from 'next/image';
import { Box } from '@/components/Box/Box';

type TProps = {
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CanvasFElementsList = ({ isListOpen, setIsListOpen }: TProps) => {
  const onClick = () => {
    setIsListOpen(false);
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
              <p>{macoLock.article}</p>
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
