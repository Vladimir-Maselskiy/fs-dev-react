import React from 'react';
import { StyledModal } from './ModalLayout.styled';

type TProps = {
  children: JSX.Element | null;
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
    <StyledModal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </StyledModal>
  );
};
