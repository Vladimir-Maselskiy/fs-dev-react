import { ModalSetBrand } from '@/components/ModalSetBrand/ModalSetBrand';
import { ModalSetOption } from '@/components/ModalSetOption/ModalSetOption';
import { ModalTypeOfOpening } from '@/components/ModalTypeOfOpening/ModalTypeOfOpening';
import React, { useState, useEffect } from 'react';

type TProps = {
  id: string;
  modalNumber: number;
  form: any;
};

export const CurrentModal = ({
  id,
  modalNumber = 2,
  form,
}: TProps) => {
  const [Modal, setModal] = useState<JSX.Element>(
    <ModalSetOption id={id} form={form}/>
  );
  useEffect(() => {
    switch (modalNumber) {
      case 1:
        setModal(<ModalSetBrand id={id} />);
        break;
      case 2:
        setModal(<ModalSetOption id={id} form={form} />);
        break;
      case 3:
        setModal(<ModalTypeOfOpening id={id} />);
        break;
    }
  }, [modalNumber]);

  return Modal;
};
