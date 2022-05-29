import React from 'react';
import { UnstyledButton, Box, Stack, Title, Group, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const StyledButton = ({genre}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/genre/${genre.toLowerCase()}`)
    }

    return(
        <UnstyledButton onClick={handleClick}>
            <Paper withBorder sx={{width: 100}} shadow="xs" p="xs">
                <Title align='center' order={6}>{genre}</Title>
            </Paper>
        </UnstyledButton>
    )
}

const genresList = ['Hip-Hop', 'Dubstep', 'EDM', 'Pop', 'Hindi', 'Tamil', 'Metal']

const GenreComp = ({label}) => {
    return (
        <Stack mb={24}>
            {label && <Title sx={{color: 'inherit'}} order={5} pb={12}>{label}</Title>}
            <Group position='center' grow>
                {genresList.map((genre)=>{return <StyledButton genre={genre} />})}
            </Group>
        </Stack>
    );
}

export default GenreComp;
