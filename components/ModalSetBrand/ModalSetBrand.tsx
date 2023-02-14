import React, { useState, useEffect } from 'react';
import { Radio, Form, Input, Checkbox, Button } from 'antd';
import url from '../../img/maco-logo.svg';
import { Box } from '../Box/Box';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconMacoLogoGray from '../../img/maco-logo-gray.svg';
import type { RadioChangeEvent } from 'antd';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  id: string;
  form: any;
};

export const ModalSetBrand = ({ id, form }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);
  const [brand, setBrand] = useState<'maco' | 'vorne'>(
    'maco'
  );

  const onChangeBrand = (e: RadioChangeEvent) => {
    setBrand(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue({ brand });
    if (fSet) setFSet({ ...fSet, brand });
  }, [brand]);

  return (
    <Radio.Group
      defaultValue="a"
      onChange={onChangeBrand}
      style={{
        display: 'flex',
        justifyContent: 'center',

        gap: '10px',
        paddingTop: '40px',
        paddingBottom: '10px',
      }}
      // buttonStyle="solid"
      optionType="button"
    >
      <Radio.Button
        value="maco"
        style={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {brand === 'maco' ? (
          <IconMacoLogo width={80} height={80} />
        ) : (
          <IconMacoLogoGray width={80} height={80} />
        )}
      </Radio.Button>
      <Radio.Button
        value="vorne"
        style={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {brand === 'maco' ? (
          <IconMacoLogo width={80} height={80} />
        ) : (
          <IconMacoLogoGray width={80} height={80} />
        )}
      </Radio.Button>
    </Radio.Group>
  );
};
