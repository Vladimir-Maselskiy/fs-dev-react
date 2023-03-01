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
import { getSetById } from '@/utils/ui-utills/getSetById';

type TProps = {
  fSet: IFSet;
  form: any;
};

export const ModalSetBrand = ({ fSet, form }: TProps) => {
  // const onChangeBrand = (e: RadioChangeEvent) => {
  //   if (fSet) setFSet({ ...fSet, brand: e.target.value });
  // };

  useEffect(() => {
    if (fSet?.brand) {
      form.setFieldsValue({ brand: fSet.brand });
    }
  }, [fSet?.brand, form]);

  return (
    <Form.Item name="brand" initialValue={fSet?.brand}>
      <Radio.Group
        // onChange={onChangeBrand}
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
