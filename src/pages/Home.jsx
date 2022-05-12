import React, {useContext, useState, useEffect} from 'react'
import { LoadingOverlay, Text } from '@mantine/core';
import { UptuneContext } from '../context/UptuneContext'
import { showNotification } from '@mantine/notifications';

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
    {!songs == [] && songs.map((song) =>{
      return <Text>{song.title}</Text>
    })}
    </>
  )
}
