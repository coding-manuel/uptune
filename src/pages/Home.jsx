import React, {useContext, useState, useEffect} from 'react'
import { LoadingOverlay, Stack } from '@mantine/core';

import SwiperComp from '../components/SwiperComp';
import { MusicContext } from '../context/MusicContext';
import { UptuneContext } from '../context/UptuneContext';
import GenreComp from '../components/GenreComp';


export default function Home() {
  const {AllSongs, fetchSongs, mostTipped} = useContext(MusicContext);
  const {setLoadingStatus} = useContext(UptuneContext);
  const [loading, setLoading] = useState(true);
  const [mostTippedList, setMostTippedList] = useState([]);

  useState(() => {
    setMostTippedList(mostTipped)
    console.log(mostTipped)
  }, [mostTipped])

  useEffect(()=>{
    if(AllSongs){
      setLoading(false)
    }
  }, [AllSongs])

  useEffect(()=>{
    fetchSongs()
    setLoadingStatus('')
  }, [])


  return (
    <>
      <LoadingOverlay visible={loading} />
      {!loading && <SwiperComp label="Most Tipped" songs={mostTipped} />}
      {!loading && <GenreComp label="Browse by Genre" />}
    </>
  )
}
