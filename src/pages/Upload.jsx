import { useRef, useState, useContext } from 'react'
import { Button, Chips, Chip, TextInput, Group, Stack, Text, MediaQuery } from '@mantine/core';
import { Dropzone  } from '@mantine/dropzone';
import { Camera } from "phosphor-react";

import { UptuneContext } from '../context/UptuneContext';

export const dropzoneChildren = (status) => (
    <Group position="center" spacing="sm" style={{ height: 200, width: 200, pointerEvents: 'none' }}>
        <Camera size={24} weight="fill" />
        <Text size="sm" color="dimmed" inline>
            Upload Image
        </Text>
    </Group>
);

const moods = ['Happy', 'Exuberant', 'Energetic', 'Frantic', 'Sad', 'Calm', 'Content']
const genres = ['Electronic', 'Rock', 'Jazz', 'Dubstep', 'Techno', 'Pop', 'Classical']

export default function Upload() {
    const {uploadAudio} = useContext(UptuneContext);
    const [tags, setTags] = useState([]);

    const handleTags = (event, limit) =>{
        const value = event.target.value
        if (tags.length > limit && !tags.includes(value)) {
            setTags([...tags.slice(0,limit), value])
        }
        else if (tags.includes(value)) {
            const tagd = tags
            tagd.splice(tags.indexOf(value), 1)
            setTags([...tagd])
        }
        else{
            setTags([...tags, value])
        }
    }

    return (
      <Stack>
        <MediaQuery
            query="(max-width: 700px)"
            styles={{ flexWrap: "wrap", justifyContent: 'center' }}
        >
            <Group noWrap spacing={48}>
                <Dropzone onDrop={(files) => console.log('accepted files', files)}>
                    {(status) => dropzoneChildren(status)}
                </Dropzone>
                <Stack>
                    <TextInput
                        placeholder="Tunuk Tunuk"
                        description="Input without Artist Names"
                        label="Title"
                        radius="md"
                        required
                    />
                    <Stack spacing={2}>
                        <Text size='sm' weight={600}>Moods <Text component='span' color="red">*</Text></Text>
                        <Text size='xs' color="dimmed">Select maximum of 3 moods</Text>
                    </Stack>
                    <Chips value={tags} onChange={() => handleTags(event, 2)} multiple>
                        {moods.map((mood) => {
                            return <Chip value={mood}>{mood}</Chip>
                        })}
                    </Chips>
                    <Stack spacing={2}>
                        <Text size='sm' weight={600}>Genres <Text component='span' color="red">*</Text></Text>
                        <Text size='xs' color="dimmed">Select maximum of 2 genres</Text>
                    </Stack>
                    <Chips value={tags} onChange={() => handleTags(event, 1)} multiple>
                        {genres.map((genre) => {
                            return <Chip value={genre}>{genre}</Chip>
                        })}
                    </Chips>
                    <Button onClick={() => uploadAudio(ref.current.files)}>Upload</Button>
                </Stack>
            </Group>
        </MediaQuery>
      </Stack>
    );
}
