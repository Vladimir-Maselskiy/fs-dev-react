import { Modal } from 'antd';
import React, { useState } from 'react';

type TProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LocksOptionsDrawModal = ({
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
      LocksOptionsDrawModal
    </Modal>
  );
};
