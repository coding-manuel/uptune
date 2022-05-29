import React, {useContext} from 'react'
import { Stack, Text, Image, Box } from '@mantine/core'
import { useHover } from '@mantine/hooks';

import { MusicContext } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import { Play } from 'phosphor-react';

export default function SongThumb({ song }) {
  const {setSongData} = useContext(MusicContext);
  const { hovered, ref } = useHover();
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
    <Stack sx={{gap:2, width: 150, position: 'relative'}}>
      <Image ref={ref} onClick={handleClick} withPlaceholder src={song.coverartgateway} sx={{height: 150, cursor:"pointer"}} radius='sm' alt={song.title}/>
      <Stack align="center" justify='center' sx={{ transition: 'all .1s ease-out', background: 'rgba(0,0,0,0.6)', opacity: hovered ? 1 : 0, width: 150, height: 150, position: 'absolute', pointerEvents: 'none'}}><Play size={32} color='#ffffff' /></Stack>
      <Text size='md' weight={700}>{song.title}</Text>
      <Text onClick={handleArtistClick} variant="link" size='sm' weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis', color: 'inherit', cursor: 'pointer'}}>{song.mainArtist}{song.supportArtist != [] && ', ' + song.supportArtist}</Text>
    </Stack>
  )
}
