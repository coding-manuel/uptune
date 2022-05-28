import React ,{ useRef } from 'react';
import { Title, ActionIcon } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CaretRight, CaretLeft } from "phosphor-react"
import { Navigation } from 'swiper';

import SongThumb from './SongThumb';

import 'swiper/css';
import 'swiper/css/navigation';

const SwiperComp = ({songs, label}) => {

    const nextEl = useRef(null)
    const prevEl = useRef(null)

    return (
    <>
    {label && <Title sx={{color: 'inherit'}} order={5} pb={12}>{label}</Title>}
    <Swiper
        style={{zIndex: 0}}
        modules={[Navigation]}
        rewind
        navigation={{
          nextEl: nextEl.current,
          prevEl: prevEl.current
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevEl.current;
          swiper.params.navigation.nextEl = nextEl.current;
        }}
        breakpoints={{
          0:{
            width: 340,
            slidesPerView: 2
          },
          520: {
            width: 480,
            slidesPerView: 3,
          },
          700: {
            width: 640,
            slidesPerView: 4,
          },
          820:{
            width: 800,
            slidesPerView: 5,
          },
          1000:{
            width: 960,
            slidesPerView: 6,
          },
          1120:{
            width: 1100,
            slidesPerView: 7,
          }
        }}
      >
        {!songs == [] && songs.map((song) =>{
          return <SwiperSlide><SongThumb song={song} /></SwiperSlide>
        })}
        <ActionIcon variant='filled' radius='lg' sx={{position: 'absolute', right: 0, top: '40%', zIndex: 1000}} ref={nextEl}><CaretRight size={32} weight="fill" /></ActionIcon>
        <ActionIcon variant='filled' radius='lg' sx={{position: 'absolute', left: 0, top: '40%', zIndex: 1000}} ref={prevEl}><CaretLeft size={32} weight="fill" /></ActionIcon>
      </Swiper>
    </>
    );
}

export default SwiperComp;
