import React, {useContext, useEffect, useState} from 'react'
import { Title, Group, useMantineTheme } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { MusicContext } from '../context/MusicContext'
import SongThumb from '../components/SongThumb';

export default function Genre() {
    const {genreList} = useContext(MusicContext);

    const [localGenreList, setLocalGenreList] = useState({});
    const {genre} = useParams()
    const theme = useMantineTheme()

    useEffect(() => {
        console.log(genreList)
        setLocalGenreList(genreList)
    }, [genreList])

    return (
        <>
            <Title order={5}><span style={{color: theme.colors.red[7]}}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</span> Songs</Title>

            <Group my={12} position='center' grow>
                {Object.keys(localGenreList).length !== 0 && localGenreList[genre].map((song) => {
                    return(
                        <SongThumb song={song} />
                    )
                })}
            </Group>
        </>
    )
}
