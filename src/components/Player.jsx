import React, {useContext, useEffect, useState} from 'react'
import { Footer, Group, Image, Stack, Text, ActionIcon, Box, Tooltip } from '@mantine/core';
import { Play, SkipForward, SkipBack, Pause, SpeakerSimpleHigh, SpeakerSimpleSlash, CurrencyEth, Chats } from 'phosphor-react'
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import Marquee from "react-fast-marquee";

import 'react-h5-audio-player/lib/styles.css';
import './player.css'

import { MusicContext } from '../context/MusicContext';
import { useMediaQuery } from '@mantine/hooks';

const Playing = ({songInfo, matches}) => {
  const mobile = useMediaQuery('(max-width: 500px)');

  return(
    <Group noWrap mx={20} spacing='md'>
      {!mobile && <Image radius='xs' style={{width: '40px', height: '40px'}} src={songInfo.coverartgateway} />}
      <Stack style={{width: mobile ? '100px' : '150px'}} sx={{gap: 0}}>
        {songInfo.length !== 0 &&
          <>
            <Text size='md' weight={700} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{songInfo.title}</Text>
            {matches ? <Marquee pauseOnHover gradient={false}><Text size='sm' weight={400}>{songInfo.mainArtist}{songInfo.supportArtist != [] && ',' + songInfo.supportArtist}</Text></Marquee> :
            <Text size='sm' weight={400} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden'}}>{songInfo.mainArtist}{songInfo.supportArtist != [] && ', ' + songInfo.supportArtist}</Text>
            }
          </>
        }
      </Stack>
    </Group>
  )
}

const IconButton = ({ setOpen, type, matches }) => {
  return(
    <Box onClick={() => setOpen(true)} sx={{flex: matches && '1 0 auto', marginLeft: !matches && '16px', justifyContent: 'flex-end', display: 'flex'}}>
      <Tooltip
        label={<Text size='xs' weight={600}>{type}</Text>}
        withArrow
        gutter={10}
      >
        <ActionIcon p={4} sx={{width: "initial", height: "initial"}}>
          {type === 'Comments' ?
          <Chats size={24} weight="fill" />
          :
          <CurrencyEth size={24} weight="fill" />
          }
        </ActionIcon>
      </Tooltip>
    </Box>
  )
}

export default function Player() {
  const {songData, setModalOpen, commentDrawer, setCommentDrawer} = useContext(MusicContext);
  const matches = useMediaQuery('(max-width: 600px)');
  const [songInfo, setSongInfo] = useState([]);

  useEffect(() => {
    setSongInfo(songData)
  }, [songData]);

  return (
    <Footer fixed sx={{transform: songInfo.length === 0 ? 'translate(0px, 90px)' : 'translate(0px, 0px)', transition: '0.3s'}}>
      <AudioPlayer
          customProgressBarSection={
            [
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
            ]
          }
          customControlsSection={
            [
              RHAP_UI.MAIN_CONTROLS,
              <Playing matches={matches} songInfo={songInfo} />,
              !matches && RHAP_UI.VOLUME_CONTROLS,
              <IconButton setOpen={setModalOpen} type="Tip" matches={matches} />,
              <IconButton setOpen={setCommentDrawer} type="Comments" matches={matches} />
            ]
          }
          showSkipControls={true}
          showJumpControls={false}
          showFilledVolume={true}
          customIcons={{
            play: <Play size={32} weight="fill" />,
            pause: <Pause size={32} weight="fill" />,
            next: <SkipForward size={22} weight="fill" />,
            previous: <SkipBack size={22} weight="fill" />,
            volume: <SpeakerSimpleHigh size={22} weight="fill" />,
            volumeMute: <SpeakerSimpleSlash size={22} weight="fill" />
          }}
          src={songInfo.audiogateway}
      />
    </Footer>
  )
}
