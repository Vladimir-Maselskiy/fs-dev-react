import React from 'react';
import { StyledModal } from './ModalLayout.styled';
import { Form, ConfigProvider, Button } from 'antd';

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
    form.resetFields();
  };

  const [form] = Form.useForm();

  const onFinishHandleSubmit = (values: any) => {
    console.log('onFinishHandleSubmit', values);
    form.resetFields();
  };
  const onValuesChange = (values: any) => {
    console.log(values);
  };

  return (
    <StyledModal
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <ConfigProvider
        theme={{
          token: {
            screenXS: 320, // for grid (row/col)
            screenXSMin: 300, // default is 1600, for List
            screenXSMax: 320, // default is 1600, for List
            screenSMMin: 321,
            screenSM: 480,
            screenSMMax: 480,
            screenMDMin: 481,
            screenMD: 481,
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
        >
          {children}
        </Form>
      </ConfigProvider>
    </StyledModal>
  );
};
