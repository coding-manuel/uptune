import React, { useEffect, useState, useContext } from 'react'
import { Stack, Box, Tooltip, Group, Text, Image, Title, ActionIcon, Badge, MediaQuery } from '@mantine/core';
import { ShareNetwork } from 'phosphor-react';
import { useParams } from 'react-router-dom'

import { MusicContext } from '../context/MusicContext';
import { UptuneContext } from "../context/UptuneContext"
import { showNotification } from '@mantine/notifications';

const IconButton = ({ type }) => {
    return(
      <Box onClick={() => setOpen(true)} sx={{justifyContent: 'flex-end', display: 'flex'}}>
        <Tooltip
            label={<Text size='xs' weight={600}>{type}</Text>}
            position='bottom'
            withArrow
            gutter={10}
        >
          <ActionIcon variant='filled' p={4} sx={{width: "initial", height: "initial"}}>
            {type === 'Share' ?
            <ShareNetwork size={16} weight="regular" />
            :
            <ShareNetwork size={24} weight="fill" />
            }
          </ActionIcon>
        </Tooltip>
      </Box>
    )
  }

export default function Song() {
    const {setSongData} = useContext(MusicContext)
    const {getOneAudio, getArtistSongs} = useContext(UptuneContext);
    const {id} = useParams()

    const [songInfo, setSongInfo] = useState(false);

    const handleShare = () => {
        const shareLink = `http://localhost:3000/song/${id}`
        navigator.clipboard.writeText(shareLink);

        showNotification({
            title: 'Link copied to clipboard',
            message: 'Share the song to as many people as you want',
        })
    }

    const handleArtistClick = () => {
        getArtistSongs(songInfo.wallet)
    }

    useEffect(()=>{
        async function fetchSongs() {
            let uuid = id
            let response = await getOneAudio(uuid)
            setSongInfo(response)
            setSongData(response)
        }
        fetchSongs()
      }, [])


    return (
    <Stack>
        <MediaQuery
            query="(max-width: 500px)"
            styles={{ justifyContent: 'center' }}
        >
            <Group align='flex-start' spacing={30}>
                <Tooltip
                    label={<Text size='xs' weight={600}>Share</Text>}
                    position='bottom'
                    withArrow
                    gutter={10}
                >
                    <Image src={songInfo.coverartgateway} onClick={handleShare} sx={{maxWidth: 200, cursor:"pointer"}} radius='sm' alt={songInfo.title}/>
                </Tooltip>
                <Stack sx={{maxWidth: '90%', gap: 4}}>
                    <Title order={4} sx={{color: 'white'}}>{songInfo.title}</Title>
                    <Text size='md' onClick={handleArtistClick} variant="link" weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis', color: 'white'}}>{songInfo.mainArtist}{songInfo.supportArtist != [] && ',' + songInfo.supportArtist}</Text>
                    <Group pt={24}>
                        {songInfo && songInfo.genres.map((genre) => <Badge sx={{cursor: 'pointer'}}>{genre}</Badge>)}
                    </Group>
                </Stack>
            </Group>
        </MediaQuery>
    </Stack>
    )
}