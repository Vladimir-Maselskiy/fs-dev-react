import React from 'react';
import { StyledModal } from './ModalLayout.styled';
import { Form } from 'antd';

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
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const onFinishHandleSubmit = (values: any) => {
    console.log(values);
  };
  const onValuesChange = (values: any) => {
    console.log(values);
  };

  return (
    <StyledModal
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <Form
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        labelAlign="left"
        form={form}
        onFinish={onFinishHandleSubmit}
        onValuesChange={onValuesChange}
      >
        {children}
      </Form>
    </StyledModal>
  );
};
