import React, { useState, useEffect } from 'react';
import { Radio, Form } from 'antd';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconMacoLogoGray from '../../img/maco-logo-gray.svg';
import IconVorneLogo from '../../img/vorne-logo.svg';
import IconVorneLogoGray from '../../img/vorne-logo-gray.svg';
import IconWinkhausLogo from '../../img/winkhaus-logo.svg';
import IconWinkhauseLogoGray from '../../img/winkhaus-logo-gray.svg';

import type { RadioChangeEvent } from 'antd';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';
import { getSetById } from '@/utils/getSetById';

type TProps = {
  id: string;
  form: any;
};

export const ModalSetBrand = ({ id, form }: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);
  // const [brand, setBrand] = useState<
  //   'maco' | 'vorne' | 'winkhaus'
  // >('maco');

  const onChangeBrand = (e: RadioChangeEvent) => {
    if (fSet) setFSet({ ...fSet, brand: e.target.value });
  };

  useEffect(() => {
    const originalfSet = getSetById(id, fSetsArray);
    if (originalfSet) {
      setFSet({ ...originalfSet });
    }
  }, [id, fSetsArray]);

  useEffect(() => {
    if (fSet?.brand) {
      form.setFieldsValue(fSet.brand);
    }
  }, [fSet?.brand, form]);

  return (
    <Form.Item name="brand">
      <Radio.Group
        onChange={onChangeBrand}
        style={{
          display: 'flex',
          justifyContent: 'center',

          gap: '10px',
          paddingTop: '40px',
          paddingBottom: '10px',
        }}
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
          {fSet?.brand === 'maco' ? (
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
          {fSet?.brand === 'vorne' ? (
            <IconVorneLogo width={80} />
          ) : (
            <IconVorneLogoGray width={80} />
          )}
        </Radio.Button>
        <Radio.Button
          value="winkhaus"
          style={{
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {fSet?.brand === 'winkhaus' ? (
            <IconWinkhausLogo width={80} />
          ) : (
            <IconWinkhauseLogoGray width={80} />
          )}
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
