import React, {useContext} from 'react'
import { Stack, Text, Button, Image, Paper } from '@mantine/core'

import { MusicContext } from '../context/MusicContext';

export default function SongThumb({ song }) {
  const {setSongData} = useContext(MusicContext);

  const handleClick = () => {
    console.log(song)
    setSongData(song)
  }

  return (
    <Stack onClick={handleClick} sx={{gap:2, width: 150}}>
        <Image src={song.coverartgateway} sx={{height: 150, cursor:"pointer"}} radius='sm' alt={song.title}/>
        <Text size='md' weight={700}>{song.title}</Text>
        <Text size='sm' weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis'}}>{song.mainArtist}{song.supportArtist != [] && ',' + song.supportArtist}</Text>
    </Stack>
  )
}
