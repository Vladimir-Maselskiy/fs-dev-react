import { Modal } from 'antd';
import React from 'react';
import { padding } from 'styled-system';

type TProps = {
  children: JSX.Element;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isModalOpen: boolean;
};

export const ModalLayout = ({
  children,
  setIsModalOpen,
  isModalOpen,
}: TProps) => {
  const handleOk = () => {};
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form>{children}</form>
    </Modal>
  );
};
