import React, { useEffect, useState } from 'react';
import { StyledModal } from './ModalLayout.styled';
import { Form, ConfigProvider, Button } from 'antd';
import { getSetById } from '@/utils/getSetById';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';
import { setIsInputValid } from '@/utils/setIsInputValid';

type TProps = {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isModalOpen: boolean;
  currentModal: React.ElementType;
  id: string;
  modalNumber: number;
};

export const ModalLayout = ({
  setIsModalOpen,
  isModalOpen,
  currentModal: CurrentModal,
  id,
  modalNumber,
}: TProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const [form] = Form.useForm();
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);

  useEffect(() => {
    if (fSet) {
      setFSetsArray(prev =>
        prev.map(set => {
          if (set.id === fSet.id) return fSet;
          return set;
        })
      );
    }
  }, [fSet]);

  const onFinishHandleSubmit = (values: any) => {
    const currentSet = getSetById(id, fSetsArray);

    if (currentSet) setFSet({ ...currentSet, ...values });
    form.resetFields();
    setIsModalOpen(false);
  };
  const onValuesChange = (values: any) => {};

  return (
    <StyledModal
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
      destroyOnClose={true}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            screenXS: 320,
            screenXSMin: 300,
            screenXSMax: 320,
          },
        }}
      >
        <Form
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 0 }}
          layout="horizontal"
          form={form}
          onFinish={onFinishHandleSubmit}
          onValuesChange={onValuesChange}
          labelAlign="left"
        >
          <CurrentModal
            id={id}
            modalNumber={modalNumber}
            form={form}
          />
        </Form>
      </ConfigProvider>
    </StyledModal>
  );
};
