import React from 'react';
import { UnstyledButton, Box, Stack, Title, Group, Paper } from '@mantine/core';

const StyledButton = ({genre}) => {
    return(
        <UnstyledButton>
            <Paper withBorder sx={{width: 100}} shadow="xs" p="xs">
                <Title align='center' order={6}>{genre}</Title>
            </Paper>
        </UnstyledButton>
    )
}

const genresList = ['Rock', 'Jazz', 'Dubstep', 'Techno', 'Pop', 'Classical']

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
