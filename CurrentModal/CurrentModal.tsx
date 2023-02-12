import { ModalSetBrand } from '@/components/ModalSetBrand/ModalSetBrand';
import { ModalSetOption } from '@/components/ModalSetOption/ModalSetOption';
import { ModalTypeOfOpening } from '@/components/ModalTypeOfOpening/ModalTypeOfOpening';
import React, { useState, useEffect } from 'react';

type TProps = {
  id: string;
  modalNumber: number;
};

export const CurrentModal = ({
  id,
  modalNumber = 2,
}: TProps) => {
  const [Modal, SetModal] = useState<JSX.Element>(
    <ModalSetOption id={id} />
  );
  useEffect(() => {
    switch (modalNumber) {
      case 1:
        SetModal(<ModalSetBrand id={id} />);
        break;
      case 2:
        SetModal(<ModalSetOption id={id} />);
        break;
      case 3:
        SetModal(<ModalTypeOfOpening id={id} />);
        break;
    }
  }, [modalNumber]);

  return Modal;
};
