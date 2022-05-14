import React, {useContext, useEffect, useState} from 'react'
import { Footer } from '@mantine/core';
import { Play, SkipForward, SkipBack, Pause, SpeakerSimpleHigh, SpeakerSimpleSlash } from 'phosphor-react'
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './player.css'

import { MusicContext } from '../context/MusicContext';

export default function Player() {
  const {songData} = useContext(MusicContext);
  const [songInfo, setSongInfo] = useState([]);

  useEffect(() => {
    setSongInfo(songData)
  }, [songData]);

  return (
    <Footer fixed>
      <AudioPlayer
          customProgressBarSection={
            [
              RHAP_UI.PROGRESS_BAR,
            ]
          }
          customControlsSection={
            [
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.CURRENT_TIME,
              <div className='rhap_time'>/</div>,
              RHAP_UI.DURATION,
              RHAP_UI.VOLUME_CONTROLS,
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
