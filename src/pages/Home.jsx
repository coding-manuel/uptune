import React, {useContext, useState, useEffect} from 'react'
import { LoadingOverlay, Stack } from '@mantine/core';

import SwiperComp from '../components/SwiperComp';
import { MusicContext } from '../context/MusicContext';
import { UptuneContext } from '../context/UptuneContext';
import GenreComp from '../components/GenreComp';


export default function Home() {
  const {AllSongs, fetchSongs, mostTipped, moodList} = useContext(MusicContext);
  const {setLoadingStatus} = useContext(UptuneContext);

  const [loading, setLoading] = useState(true);
  const [mostTippedList, setMostTippedList] = useState([]);
  const [moodSongList, setMoodSongList] = useState({});

  useState(() => {
    setMoodSongList(moodList)
  }, [moodList])

  useState(() => {
    setMostTippedList(mostTipped)
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
      {!loading && <SwiperComp label="Fuel your energy" songs={moodList['Energetic']} />}
      {!loading && <SwiperComp label="Feelng Happy" songs={moodList['Happy']} />}
      {!loading && <GenreComp label="Browse by Genre" />}
    </>
  )
}
