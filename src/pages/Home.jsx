import React, {useContext, useState, useEffect} from 'react'
import { LoadingOverlay, Button, ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import SwiperComp from '../components/SwiperComp';
import { MusicContext } from '../context/MusicContext';


export default function Home() {
  const {AllSongs} = useContext(MusicContext);
  const [loading, setLoading] = useState(true);

  const [songs, setSongs] = useState([]);

  useEffect(()=>{
    setSongs(AllSongs)
    setLoading(AllSongs.length == 0)
  }, [AllSongs])


  return (
    <>
      <LoadingOverlay visible={loading} />
      {!loading && <SwiperComp label="Trending Now" songs={songs} />}
      {!loading && <SwiperComp label="Trending Now" songs={songs} />}
    </>
  )
}
