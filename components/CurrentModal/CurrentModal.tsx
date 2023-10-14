import { ModalSetBrand } from '@/components/ModalSetBrand/ModalSetBrand';
import { ModalSetOption } from '@/components/ModalSetOption/ModalSetOption';
import { ModalTypeOfOpening } from '@/components/ModalTypeOfOpening/ModalTypeOfOpening';
import { IFSet } from '@/interfaces/interfaces';
import React, { useState, useEffect } from 'react';

type TProps = {
  fSet: IFSet;
  modalNumber: number;
  form: any;
  setIsModalPressLocksOptionsOpened: React.Dispatch<boolean>;
};

export const CurrentModal = ({
  fSet,
  modalNumber = 2,
  form,
  setIsModalPressLocksOptionsOpened,
}: TProps) => {
  const [Modal, setModal] = useState<JSX.Element>(
    <ModalSetOption
      fSet={fSet}
      form={form}
      setIsModalPressLocksOptionsOpened={setIsModalPressLocksOptionsOpened}
    />
  );
  useEffect(() => {
    switch (modalNumber) {
      case 1:
        setModal(<ModalSetBrand fSet={fSet} form={form} />);
        break;
      case 2:
        setModal(
          <ModalSetOption
            fSet={fSet}
            form={form}
            setIsModalPressLocksOptionsOpened={
              setIsModalPressLocksOptionsOpened
            }
          />
        );
        break;
      case 3:
        setModal(<ModalTypeOfOpening fSet={fSet} form={form} />);
        break;
    }
  }, [modalNumber, form, fSet]);

  return Modal;
};
