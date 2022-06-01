import React, {useEffect, useContext, useState} from 'react'
import { Box, Stack, Overlay, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { UptuneContext } from '../context/UptuneContext'
import SwiperComp from '../components/SwiperComp';

export default function Artist() {
  const {getArtist, getMultipleAudio} = useContext(UptuneContext)
  const [artistData, setArtistData] = useState(false);
  const [artistSongs, setArtistSongs] = useState([]);

  const {id} = useParams()

  useEffect(()=>{
    async function fetchArtist() {
        let artistID = id
        let response = await getArtist(artistID)
        setArtistData(response)
    }
    fetchArtist()
  }, [])

  useEffect(()=>{
    async function fetchSongs() {
      let songs = await getMultipleAudio(artistData)
      setArtistSongs(songs)
      console.log(artistSongs)
    }
    artistData && fetchSongs()
  }, [artistData])

  return (
    <>
      <Box sx={{position: 'relative', marginBottom: 16}}>
        <Box sx={{height: 'clamp(120px, 50vw, 400px); ', borderRadius: 4, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${artistData.profilegateway})`}}></Box>
        <Overlay
          sx={{opacity: 1}}
          gradient={'linear-gradient(180deg, #00000049 12%, #141517 90%)'}
        />
        <Title sx={{zIndex: 900, position: 'absolute', bottom: 0}} p={12} order={4}>{artistData.artistName}</Title>
      </Box>
      <SwiperComp songs={artistSongs}/>
    </>
  )
}
