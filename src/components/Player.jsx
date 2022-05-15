import React, {useContext, useEffect, useState} from 'react'
import { Footer, Group, Image, Stack, Text, ActionIcon, Box } from '@mantine/core';
import { Play, SkipForward, SkipBack, Pause, SpeakerSimpleHigh, SpeakerSimpleSlash, CurrencyEth } from 'phosphor-react'
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import Marquee from "react-fast-marquee";

import 'react-h5-audio-player/lib/styles.css';
import './player.css'

import { MusicContext } from '../context/MusicContext';
import { useMediaQuery } from '@mantine/hooks';

const Playing = ({songInfo, matches}) => {
  const mobile = useMediaQuery('(max-width: 450px)');

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

export default function Player() {
  const {songData} = useContext(MusicContext);
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
              <Box sx={{flex: matches && '1 0 auto', marginLeft: !matches && '16px', justifyContent: 'flex-end', display: 'flex'}}><ActionIcon p={4} sx={{width: "initial", height: "initial"}}><CurrencyEth size={24} weight="fill" /></ActionIcon></Box>,
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
