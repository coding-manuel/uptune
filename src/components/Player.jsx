import React from 'react'
import { Footer } from '@mantine/core';
import { Play, SkipForward, SkipBack, Pause, SpeakerSimpleHigh, SpeakerSimpleSlash } from 'phosphor-react'
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './player.css'

export default function Player() {
  const song = [{
    name: "November",
    src: "https://bafybeih4bkc4ynco4uzaauo7ns464l2ir7ecsokkqmq6e6zwu7nogl3ryy.ipfs.dweb.link/Y2Mate.is%20-%20%28HARD%29%20Dark%20Type%20Beat%20-%20K9-IZpnVvT60DM-160k-1642665018612.mp3"
  }];
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
          src={song[0].src}
      />
    </Footer>
  )
}
