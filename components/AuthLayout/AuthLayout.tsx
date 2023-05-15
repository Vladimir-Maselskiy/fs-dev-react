import React from 'react';
import {
  SwiperContainer,
  StyledAuthLayout,
  StyledImageBox,
} from './AuthLayout.styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import { Logo } from '../Logo/Logo';
import { Box } from '../Box/Box';

type TProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: TProps) => {
  return (
    <Box padding={20}>
      <Logo />
      <StyledAuthLayout>
        {children}
        <SwiperContainer>
          <Swiper
            style={{ height: '100%' }}
            //   spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            //   navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image src="/eye.jpg" alt="multikey maco" fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/plates.jpg" alt="multikey maco" fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/Praxisbeispiel.jpg" alt="multikey maco" fill />
            </SwiperSlide>
            <SwiperSlide
              style={{
                backgroundColor: 'var(--accent-color)',
              }}
            >
              <Image
                src="/maco-key.png"
                alt="maco key"
                fill
                style={{
                  transform: 'translateX(80px) rotate(-45deg)',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/Praxis.jpg" alt="multikey maco" fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/Getreibe.jpg" alt="multikey maco" fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/abdeckkappen.jpg" alt="multikey maco" fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/multipower.jpg" alt="multikey maco" fill />
            </SwiperSlide>

            <SwiperSlide>
              <Image src="/multikey.png" alt="multikey maco" fill />
            </SwiperSlide>
          </Swiper>
        </SwiperContainer>
      </StyledAuthLayout>
    </Box>
  );
};
