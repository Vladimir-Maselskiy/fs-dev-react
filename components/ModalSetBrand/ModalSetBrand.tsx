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
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Box } from '../Box/Box';
import { getIndexByBrand } from '@/utils/ui-utills/getIndexByBrand';
import { IconWrapper } from './ModalSetBrand.styled';

type TProps = {
  fSet: IFSet;
  form: FormInstance<any>;
};

export const ModalSetBrand = ({ fSet, form }: TProps) => {
  const [brand, setBrand] = useState(fSet.brand);
  const [index, setIndex] = useState(getIndexByBrand(fSet));

  const onSlideChange = (swiper: any) => {
    const index = swiper.realIndex;
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
      default:
        setIndex(index);
    }
  };

  return (
    <Box>
      <Box pt={20}>
        <p>{brand.toUpperCase()}</p>
      </Box>

      <Divider />

      <Form.Item name="brand" initialValue={fSet?.brand}>
        <Swiper
          style={{ minHeight: 130 }}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          onSlideChange={onSlideChange}
          initialSlide={index}
        >
          <SwiperSlide>
            <IconWrapper>
              <IconMacoLogo width={80} height={80} />
            </IconWrapper>
          </SwiperSlide>
          <SwiperSlide>
            <IconWrapper>
              <IconVorneLogo width={80} />
            </IconWrapper>
          </SwiperSlide>
          {/* <SwiperSlide>
            <IconWrapper>
              <IconWinkhausLogo width={80} />
            </IconWrapper>
          </SwiperSlide> */}
        </Swiper>
      </Form.Item>
    </Box>
  );
};
