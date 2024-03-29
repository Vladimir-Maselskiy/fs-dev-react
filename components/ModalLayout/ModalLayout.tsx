import React from 'react';
import { StyledModal } from './ModalLayout.styled';
import { Form, ConfigProvider } from 'antd';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  currentModal: React.ElementType;
  fSet?: IFSet;
  setFSet?: React.Dispatch<React.SetStateAction<IFSet>>;
  modalNumber: number;
  setIsModalPressLocksOptionsOpened: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export const ModalLayout = ({
  setIsModalOpen,
  isModalOpen,
  currentModal: CurrentModal,
  fSet,
  setFSet,
  modalNumber,
  setIsModalPressLocksOptionsOpened,
}: TProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const [form] = Form.useForm();
  const { setFSetsArray } = useFSetsContext();

  const onFinishHandleSubmit = (values: any) => {
    for (let obj in values) {
      if (values[obj]?.value) values[obj] = values[obj].value;
    }
    setFSet && setFSet(prev => ({ ...prev, ...values }));

    setIsModalOpen(false);
  };

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
          labelAlign="left"
        >
          <CurrentModal
            fSet={fSet}
            modalNumber={modalNumber}
            form={form}
            setIsModalPressLocksOptionsOpened={
              setIsModalPressLocksOptionsOpened
            }
          />
        </Form>
      </ConfigProvider>
    </StyledModal>
  );
};
