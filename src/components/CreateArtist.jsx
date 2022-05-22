import React, { useState, useRef, useContext } from 'react'
import { Stack, Text, Group, TextInput, Button, Slider } from '@mantine/core'
import AvatarEditor from 'react-avatar-editor'
import { Dropzone  } from '@mantine/dropzone'
import { Camera } from "phosphor-react"
import { useForm } from '@mantine/form'
import imageCompression from 'browser-image-compression';
import { UptuneContext } from '../context/UptuneContext'

export const coverArtChildren = (file, scale, editor) => (
    <Group position="center" spacing="sm" style={{ height: 150, width: 150 }}>
        {file ?
        <AvatarEditor
            style={{zIndex: 10000}}
            image={file[1]}
            width={150}
            height={150}
            scale={scale}
            rotate={0}
            border={0}
            ref={editor}
        />
        :
        <>
        <Camera size={18} weight="fill" />
        <Text size="sm" color="dimmed" inline>
            Upload Image
        </Text>
        </>
        }
    </Group>
)

export default function CreateArtist() {
    const {loading, createArtist} = useContext(UptuneContext);
    const [coverDropLoad, setCoverDropLoad] = useState(false);
    const [artAccepted, setArtAccepted] = useState(false)
    const [scale, setScale] = useState(1);

    const editor = useRef()

    const form = useForm({
        initialValues: {
            artist: '',
        },

        validate: {
            artist: (value) => value.length >= 2 ? null : 'Enter Valid Artist Name',
        },
    })

    const handleDrop = (files, type) =>{
        setCoverDropLoad(true)
        var reader  = new FileReader()
        reader.onload = (e) =>{
            setArtAccepted([files, e.target.result])
            setCoverDropLoad(false)
        }
        reader.readAsDataURL(files[0])
    }

    const handleSubmit = async (values) =>{
        if(!artAccepted){
            showNotification({
                title: 'Oops',
                message: 'You forgot to add your profile picture',
            })
            return
        }
        const pf = await handleCrop()
        const name = values.artist.concat('-', '|profile-picture')
        const file = [new File([pf], `${name}.jpg`, {type:"image/jpeg", lastModified:new Date()})]
        values.pf = file
        createArtist(values)
    }

    const handleCrop = async () => {
        // const img =
        var dataurl = editor.current.getImage().toDataURL()

        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n)
        }
        const blob = new Blob([u8arr], {type:mime})
        const file = new File([blob], `path.jpg`, {type:"image/jpeg", lastModified:new Date()})

        const options = {
            maxSizeMB: 2,
            useWebWorker: true,
        }

        const compressedFile = await imageCompression(file, options)

        return compressedFile
    }

    return (
        <Stack align='stretch'>
            <Dropzone
                padding={0}
                multiple={false}
                accept={['image/png', 'image/jpeg']}
                onDrop={(files) => handleDrop(files, 'image')}
                onReject={(files) => handleReject(files, 'image')}
                disabled={artAccepted}
                loading={coverDropLoad}
                style={{width: 150, height: 150, margin: 'auto'}}
            >
                {() => coverArtChildren(artAccepted, scale, editor)}
            </Dropzone>
            {artAccepted &&
                <Stack sx={{width: '50%', margin: 'auto'}} grow pt={16}>
                    <Slider
                        color="red"
                        size="xs"
                        radius="xs"
                        value={scale}
                        min={1}
                        max={2}
                        step={0.1}
                        onChange={setScale}
                    />
                    <Button color="gray" size='xs' variant='outline' compact onClick={() => setArtAccepted(false)}>Remove Image</Button>
            </Stack>
            }
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack>
                    <TextInput
                        placeholder="Yo Yo Honey Singh"
                        label="Artist Name"
                        description="You won't be  able to change it"
                        radius="md"
                        required
                        pt={12}
                        {...form.getInputProps('artist')}
                    />
                    <Button loading={loading} type='submit'>Let's go</Button>
                </Stack>
            </form>
        </Stack>
    )
}
