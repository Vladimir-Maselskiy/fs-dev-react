import React from 'react';
import { StyledModal } from './ModalLayout.styled';
import { Form, ConfigProvider, Button } from 'antd';
import { useFSetsContext } from '@/context/state';

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
  const { setFSetsArray } = useFSetsContext();

  const onFinishHandleSubmit = (values: any) => {
    setFSetsArray(prev =>
      prev.map(set => {
        if (set.id === id) return { ...set, ...values };
        return set;
      })
    );
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
