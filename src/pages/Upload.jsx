import { useRef, useState, useContext } from 'react'
import { Button, Chips, Chip, TextInput, Group, Stack, Text } from '@mantine/core';
import { Dropzone  } from '@mantine/dropzone';
import { Camera } from "phosphor-react";

import { UptuneContext } from '../context/transactionsContext';

export const dropzoneChildren = (status) => (
    <Group position="center" spacing="sm" style={{ height: 200, width: 200, pointerEvents: 'none' }}>
        <Camera size={24} weight="fill" />
        <Text size="sm" color="dimmed" inline>
            Upload Image
        </Text>
    </Group>
);

const tags = ['React', 'Angular', 'Svelte', 'Vue']

export default function Upload() {
    const {uploadAudio} = useContext(UptuneContext);
    const [value, setValue] = useState(['react']);

    return (
      <Stack>
        <Group>
            <Dropzone onDrop={(files) => console.log('accepted files', files)}>
                {(status) => dropzoneChildren(status)}
            </Dropzone>
            <Stack>
                <TextInput
                    placeholder="Tunuk Tunuk"
                    label="Title"
                    radius="md"
                    required
                />
                <Chips value={value} onChange={setValue} multiple>
                    {tags.map((tag) => {
                        return <Chip value={tag}>{tag}</Chip>
                    })}
                </Chips>
            </Stack>
            <Button onClick={() => uploadAudio(ref.current.files)}>here</Button>
        </Group>
      </Stack>
    );
}
