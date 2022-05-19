import React, { useEffect, useState, useContext } from 'react'
import { Stack, Text, Image } from '@mantine/core';
import { useLocation } from 'react-router-dom'
import { MusicContext } from '../context/MusicContext';

export default function Song() {
    const {songData} = useContext(MusicContext)
    const location = useLocation()

    const [songInfo, setSongInfo] = useState(false);

    useEffect(() => {
        setSongInfo(songData)
    }, [songData]);


    return (
    <Stack sx={{gap:2, width: 150}}>
        <Image src={songInfo.coverartgateway} sx={{height: 150, cursor:"pointer"}} radius='sm' alt={songInfo.title}/>
        <Text size='md' weight={700}>{songInfo.title}</Text>
        <Text size='sm' weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis'}}>{songInfo.mainArtist}{songInfo.supportArtist != [] && ',' + songInfo.supportArtist}</Text>
    </Stack>
    )
}
