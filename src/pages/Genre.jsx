import { Title, useMantineTheme } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Genre() {
    const {genre} = useParams()
    const theme = useMantineTheme()

    return (
        <Title order={5}><span style={{color: theme.colors.red[7]}}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</span> Songs</Title>
    )
}
