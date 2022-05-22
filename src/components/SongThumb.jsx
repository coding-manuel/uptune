import React, {useContext} from 'react'
import { Stack, Text, Button, Image, Paper } from '@mantine/core'

import { MusicContext } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';

export default function SongThumb({ song }) {
  const {setSongData} = useContext(MusicContext);
  const navigate = useNavigate()

  const handleArtistClick = () => {
    navigate(`/artist/${song.wallet}`)
  }

  const handleClick = () => {
    console.log(song)
    setSongData(song)
    navigate(`/song/${song.uuid}`)
  }

  return (
    <Stack sx={{gap:2, width: 150}}>
      <Image onClick={handleClick} withPlaceholder src={song.coverartgateway} sx={{height: 150, cursor:"pointer"}} radius='sm' alt={song.title}/>
      <Text size='md' weight={700}>{song.title}</Text>
      <Text onClick={handleArtistClick} variant="link" size='sm' weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis', color: 'inherit', cursor: 'pointer'}}>{song.mainArtist}{song.supportArtist != [] && ',' + song.supportArtist}</Text>
    </Stack>
  )
}
