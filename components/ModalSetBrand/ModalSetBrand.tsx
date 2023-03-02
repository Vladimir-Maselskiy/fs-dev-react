import React, { useState, useEffect } from 'react';
import { Radio, Form, Divider, FormInstance } from 'antd';
import IconMacoLogo from '../../img/maco-logo.svg';
import IconMacoLogoGray from '../../img/maco-logo-gray.svg';
import IconVorneLogo from '../../img/vorne-logo.svg';
import IconVorneLogoGray from '../../img/vorne-logo-gray.svg';
import IconWinkhausLogo from '../../img/winkhaus-logo.svg';
import IconWinkhauseLogoGray from '../../img/winkhaus-logo-gray.svg';
import type { RadioChangeEvent } from 'antd';
import { IFSet, TBrands } from '@/interfaces/interfaces';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box } from '../Box/Box';
import { getIndexByBrand } from '@/utils/ui-utills/getIndexByBrand';

type TProps = {
  fSet: IFSet;
  form: FormInstance<any>;
};

export const ModalSetBrand = ({ fSet, form }: TProps) => {
  const [brand, setBrand] = useState(fSet.brand);
  const [index, setIndex] = useState(getIndexByBrand(fSet));

  const onChangeCarousel = (index: number) => {
    switch (index) {
      case 0:
        setBrand('maco');
        form.setFieldValue('brand', 'maco');
        break;
      case 1:
        setBrand('vorne');
        form.setFieldValue('brand', 'vorne');
        break;
      case 2:
        setBrand('winkhaus');
        form.setFieldValue('brand', 'winkhaus');
        break;
    }
    console.log('onChangeCarousel', index);
  };

  return (
    <Box>
      <Box pt={20}>
        <p>{brand.toUpperCase()}</p>
      </Box>
      <Divider />
      <Form.Item name="brand" initialValue={fSet?.brand}>
        <Carousel
          centerSlidePercentage={60}
          emulateTouch={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          preventMovementUntilSwipeScrollTolerance={false}
          thumbWidth={20}
          onChange={onChangeCarousel}
          selectedItem={index}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={80}
          >
            <IconMacoLogo width={80} height={80} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={80}
          >
            <IconVorneLogo width={80} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={80}
          >
            <IconWinkhausLogo width={80} />
          </Box>
        </Carousel>
      </Form.Item>
      {/* <Form.Item name="brand" initialValue={fSet?.brand} /> */}
    </Box>
    // <Form.Item name="brand" initialValue={fSet?.brand}>
    //   <Radio.Group
    //     onChange={onChangeBrand}
    //     style={{
    //       display: 'flex',
    //       justifyContent: 'center',
    //       gap: '10px',
    //       paddingTop: '40px',
    //       paddingBottom: '10px',
    //     }}
    //     optionType="button"
    //   >
    //     <Radio.Button
    //       value="maco"
    //       style={{
    //         height: 100,
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       {brand === 'maco' ? (
    //         <IconMacoLogo width={80} height={80} />
    //       ) : (
    //         <IconMacoLogoGray width={80} height={80} />
    //       )}
    //     </Radio.Button>
    //     <Radio.Button
    //       value="vorne"
    //       style={{
    //         height: 100,
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       {brand === 'vorne' ? (
    //         <IconVorneLogo width={80} />
    //       ) : (
    //         <IconVorneLogoGray width={80} />
    //       )}
    //     </Radio.Button>
    //     <Radio.Button
    //       value="winkhaus"
    //       style={{
    //         height: 100,
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       {brand === 'winkhaus' ? (
    //         <IconWinkhausLogo width={80} />
    //       ) : (
    //         <IconWinkhauseLogoGray width={80} />
    //       )}
    //     </Radio.Button>
    //   </Radio.Group>
    // </Form.Item>
  );
};
