import { useRef, useState, useContext, useEffect } from 'react'
import { Button, Chips, Chip, TextInput, Group, Stack, Text, MediaQuery, MultiSelect} from '@mantine/core'
import { Dropzone  } from '@mantine/dropzone'
import { showNotification } from '@mantine/notifications'
import { Camera } from "phosphor-react"
import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'

import logo from "../assets/Symbol_White.svg"
import { UptuneContext } from '../context/UptuneContext'

export const coverArtChildren = (file) => (
    <Group position="center" spacing="sm" style={{ height: 200, width: 200, pointerEvents: 'none' }}>
        {file ? <img src={file[1]} style={{height: 200, width: 200, objectFit: 'cover'}} alt="" srcset="" /> :
        <>
        <Camera size={24} weight="fill" />
        <Text size="sm" color="dimmed" inline>
            Upload Image
        </Text>
        </>
        }
    </Group>
)

export const audioChildren = (file) => (
    <Group position="center" spacing="sm" style={{ height: 50, pointerEvents: 'none' }}>
        <img style={{height: 15}} src={logo} alt="" />
        {file ? <><Text size='sm'>{file.name}</Text></> :
        <Text size="sm" color="dimmed" inline>
            Upload Audio
        </Text>
        }
    </Group>
)

const moods = ['Happy', 'Exuberant', 'Energetic', 'Frantic', 'Sad', 'Calm', 'Content']
const genresList = ['Rock', 'Jazz', 'Dubstep', 'Techno', 'Pop', 'Classical']

export default function Upload() {
    const {uploadAudio, currentAccount, loading, loadingStatus, getAllAudio, getOneAudio} = useContext(UptuneContext)
    const [tags, setTags] = useState([])
    const [genres, setGenres] = useState([])
    const [audioAccepted, setAudioAccepted] = useState(false)
    const [artAccepted, setArtAccepted] = useState(false)

    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            wallet: '',
            mainArtist: '',
            supportArtist: '',
            title: '',
            moods: [],
            genres: []
        },

        validate: {
            mainArtist: (value) => value.length > 2 ? null : 'Enter Valid Artist Name',
            title: (value) => value.length > 2 ? null : 'Enter Valid Song Title',
        },
      })

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

    const handleGenres = (value, limit) =>{
        if (value.length > limit) {
            const genre = value
            genre.splice(1,1)
            setGenres([...genre])
        }
        else{
            setGenres([...value])
        }
    }

    const handleDrop = (files, type) =>{
        if(type === 'audio'){
            setAudioAccepted(files)
        }
        else if (type === 'image'){
            var reader  = new FileReader()
            reader.onload = (e) =>{
                setArtAccepted([files, e.target.result])
            }
            reader.readAsDataURL(files[0])
        }
    }

    const handleReject = (files, type) =>{
        if(type === 'audio'){
            setAudioAccepted(false)
        }
        else if (type === 'image'){
            setArtAccepted(false)
        }
    }

    const handleSubmit = (values) =>{
        if(tags.length === 0){
            console.log(tags)
            showNotification({
                title: 'Select Atleast 1 Mood🤥',
                message: 'It helps the algorithm to suggest your song to more people',
            })
            return
        }
        else if(genres.length === 0){
            showNotification({
                title: 'Select Atleast 1 Genre🤥',
                message: 'It helps the algorithm to suggest your song to more people',
            })
            return
        }
        else if(!audioAccepted){
            showNotification({
                title: 'Oops',
                message: 'You forgot to add the main Ingredient🤥',
            })
            return
        }
        else if(!artAccepted){
            showNotification({
                title: 'Oops',
                message: 'You forgot to add the coverart🤥',
            })
            return
        }
        values.genres = genres
        values.moods = tags
        values.audio = audioAccepted
        values.art = artAccepted[0]
        uploadAudio(values)
    }

    useEffect(()=>{
        if(loadingStatus === 1){
            navigate("/home", {replace: true})
        }
    },[loadingStatus])

    return (
      <Stack>
        <MediaQuery
            query="(max-width: 700px)"
            styles={{ flexWrap: "wrap", justifyContent: 'center' }}
        >
            <Group noWrap spacing={48} align='flex-start'>
                <Dropzone
                    padding={0}
                    accept={['image/png', 'image/jpeg']}
                    onDrop={(files) => handleDrop(files, 'image')}
                    onReject={(files) => handleReject(files, 'image')}
                >
                    {() => coverArtChildren(artAccepted)}
                </Dropzone>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Stack>
                        <Dropzone
                            accept={['audio/mpeg', 'audio/x-wav']}
                            onDrop={(files) => handleDrop(files, 'audio')}
                            onReject={(files) => handleReject(files, 'audio')}
                        >
                            {() => audioChildren(audioAccepted[0])}
                        </Dropzone>
                        <TextInput
                            placeholder={currentAccount}
                            value={currentAccount}
                            label="Wallet"
                            description="The tips from audience go to this wallet"
                            radius="md"
                            required
                            disabled
                            {...form.getInputProps('wallet')}
                        />
                        <TextInput
                            placeholder="MC Stan"
                            label="Main Artist"
                            radius="md"
                            required
                            {...form.getInputProps('mainArtist')}
                        />
                        <TextInput
                            placeholder="Emiway Bantai, Raftaar"
                            label="Support Artists"
                            radius="md"
                            {...form.getInputProps('supportArtist')}
                        />
                        <TextInput
                            placeholder="Tunuk Tunuk"
                            description="Input without Artist Names"
                            label="Title"
                            radius="md"
                            required
                            {...form.getInputProps('title')}
                        />
                        <Stack spacing={2}>
                            <Text size='sm' weight={600}>Moods <Text component='span' color="red">*</Text></Text>
                            <Text size='xs' color="dimmed">Select maximum of 3 moods</Text>
                        </Stack>
                        <Chips value={tags} onChange={() => handleTags(event, 2)} multiple >
                            {moods.map((mood) => {
                                return <Chip key={mood} value={mood}>{mood}</Chip>
                            })}
                        </Chips>
                        <MultiSelect
                            label="Genres"
                            required
                            description="Select maximum of 3 Genres"
                            data={genresList}
                            value={genres}
                            onChange={(value) => handleGenres(value, 3)}
                            placeholder="Select maximum of 3 genres"
                            searchable
                            creatable
                            clearable
                            getCreateLabel={(query) => `+ Create ${query}`}
                        />
                        <Button loading={loading} type='submit'>Upload</Button>
                        {loading && <Text size='sm'>{loadingStatus}</Text>}
                    </Stack>
                </form>
            </Group>
        </MediaQuery>
      </Stack>
    )
}
