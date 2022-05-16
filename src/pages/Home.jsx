import React, {useContext, useState, useEffect, useRef} from 'react'
import { LoadingOverlay, Button, ActionIcon } from '@mantine/core';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { CaretRight, CaretLeft } from "phosphor-react"
import { Navigation } from 'swiper';
import { showNotification } from '@mantine/notifications';

import { UptuneContext } from '../context/UptuneContext'
import TipModal from '../components/TipModal';
import SongThumb from '../components/SongThumb';
import CommentDrawer from '../components/CommentDrawer';

import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  const {getAllAudio, loading} = useContext(UptuneContext);

  const [songs, setSongs] = useState([]);

  const nextEl = useRef(null)
  const prevEl = useRef(null)

  useEffect(()=>{
    async function fetchSongs() {
      let response = await getAllAudio()
      setSongs(response)
    }
    fetchSongs()
  }, [])


  return (
    <>
      <LoadingOverlay visible={loading} />
      <CommentDrawer songData={songs} />
      <TipModal />
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
  )
}
