import React, {useContext, useState, useEffect} from 'react'
import { LoadingOverlay, Button, ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { UptuneContext } from '../context/UptuneContext'
import SwiperComp from '../components/SwiperComp';


export default function Home() {
  const {getAllAudio, loading} = useContext(UptuneContext);

  const [songs, setSongs] = useState([]);

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
      <SwiperComp songs={songs} />
    </>
  )
}
