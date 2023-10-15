import { Modal } from 'antd';
import React from 'react';
import { FSetCanvas } from '../FSetCanvas/FSetCanvas';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  fSet: IFSet;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LocksOptionsDrawModal = ({
  fSet,
  isModalOpen,
  setIsModalOpen,
}: TProps) => {
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
    >
      <FSetCanvas fSet={fSet} />
    </Modal>
  );
};
