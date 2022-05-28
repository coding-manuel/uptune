import React, {useContext, useState, useEffect} from 'react'
import { LoadingOverlay, Button, ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import SwiperComp from '../components/SwiperComp';
import { MusicContext } from '../context/MusicContext';
import { UptuneContext } from '../context/UptuneContext';


export default function Home() {
  const {AllSongs, fetchSongs} = useContext(MusicContext);
  const {setLoadingStatus} = useContext(UptuneContext);
  const [loading, setLoading] = useState(true);

  const [songs, setSongs] = useState([]);

  useEffect(()=>{
    setSongs(AllSongs)
    setLoading(AllSongs.length == 0)
    setLoading(false)
  }, [AllSongs])

  useEffect(()=>{
    fetchSongs()
    setLoadingStatus('')
  }, [])


  return (
    <>
      <LoadingOverlay visible={loading} />
      {!loading && <SwiperComp label="Trending Now" songs={songs} />}
      {!loading && <SwiperComp label="Trending Now" songs={songs} />}
    </>
  )
}
