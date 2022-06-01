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

  useEffect(() => {
    setMoodSongList(moodList)
    console.log(moodList)
  }, [moodList])

  useEffect(() => {
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
      {!loading && <SwiperComp label="Workout Motivation" songs={moodList['Gym']} />}
      {!loading && <SwiperComp label="Party Vibe" songs={moodList['Party']} />}
      {!loading && <SwiperComp label="Feel the love" songs={moodList['Romance']} />}
      {!loading && <GenreComp label="Browse by Genre" />}
    </>
  )
}
