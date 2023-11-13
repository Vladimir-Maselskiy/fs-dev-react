import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { FSetCanvas } from '../FSetCanvas/FSetCanvas';
import { IFSet } from '@/interfaces/interfaces';
import { Box } from '../Box/Box';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LocksOptionsDrawModal = ({
  fSet,
  setFSet,
  isModalOpen,
  setIsModalOpen,
}: TProps) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      okButtonProps={{ disabled: isListOpen ? true : false }}
      cancelButtonProps={{ disabled: isListOpen ? true : false }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <FSetCanvas
          fSet={fSet}
          setFSet={setFSet}
          isListOpen={isListOpen}
          setIsListOpen={setIsListOpen}
        />
      </Box>
    </Modal>
  );
};
