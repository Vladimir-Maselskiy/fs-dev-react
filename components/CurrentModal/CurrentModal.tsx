import { ModalSetBrand } from '@/components/ModalSetBrand/ModalSetBrand';
import { ModalSetOption } from '@/components/ModalSetOption/ModalSetOption';
import { ModalTypeOfOpening } from '@/components/ModalTypeOfOpening/ModalTypeOfOpening';
import { IFSet } from '@/interfaces/interfaces';
import React, { useState, useEffect } from 'react';

type TProps = {
  fSet: IFSet;
  modalNumber: number;
  form: any;
};

export const CurrentModal = ({ fSet, modalNumber = 2, form }: TProps) => {
  const [Modal, setModal] = useState<JSX.Element>(
    <ModalSetOption fSet={fSet} form={form} />
  );
  useEffect(() => {
    switch (modalNumber) {
      case 1:
        setModal(<ModalSetBrand fSet={fSet} form={form} />);
        break;
      case 2:
        setModal(<ModalSetOption fSet={fSet} form={form} />);
        break;
      case 3:
        setModal(<ModalTypeOfOpening fSet={fSet} form={form} />);
        break;
    }
  }, [modalNumber, form]);

  return Modal;
};
