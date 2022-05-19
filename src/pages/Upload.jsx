import { useRef, useState, useContext, useEffect } from 'react'
import { Button, Chips, Chip, TextInput, Group, Stack, Text, MediaQuery, MultiSelect, Slider, Modal, LoadingOverlay } from '@mantine/core'
import AvatarEditor from 'react-avatar-editor'
import { Dropzone  } from '@mantine/dropzone'
import { showNotification } from '@mantine/notifications'
import { Camera } from "phosphor-react"
import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import imageCompression from 'browser-image-compression';

import logo from "../assets/Symbol_White.svg"
import { UptuneContext } from '../context/UptuneContext'

export const coverArtChildren = (file, scale, editor) => (
    <Group position="center" spacing="sm" style={{ height: 250, width: 250 }}>
        {file ?
        <AvatarEditor
            style={{zIndex: 10000}}
            image={file[1]}
            width={250}
            height={250}
            scale={scale}
            rotate={0}
            border={0}
            ref={editor}
            onClick={()=>console.log("fkjdxhfgk")}
        />
        :
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
    const {uploadAudio, currentAccount, loading, loadingStatus, getArtist, artistExist, artist} = useContext(UptuneContext)
    const [artistData, setArtistData] = useState({});
    const [coverDropLoad, setCoverDropLoad] = useState(false);
    const [audioDropLoad, setAudioDropLoad] = useState(false);
    const [tags, setTags] = useState([])
    const [scale, setScale] = useState(1);
    const [genres, setGenres] = useState([])
    const [audioAccepted, setAudioAccepted] = useState(false)
    const [artAccepted, setArtAccepted] = useState(false)

    const editor = useRef()

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
            setCoverDropLoad(true)
            var reader  = new FileReader()
            reader.onload = (e) =>{
                setArtAccepted([files, e.target.result])
                setCoverDropLoad(false)
            }
            reader.readAsDataURL(files[0])
        }
    }

    const handleReject = (files, type) =>{
        if(type === 'audio'){
            setAudioAccepted(false)
            showNotification({
                title: 'I guess you have to put an mp3?',
            })
        }
        else if (type === 'image'){
            setArtAccepted(false)
            showNotification({
                title: 'I think you got confused between audio and image.',
            })
        }
    }

    const handleSubmit = async (values) =>{
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
        const art = await handleCrop()
        const name = values.mainArtist.concat('-', values.title)
        const file = [new File([art], `${name}.jpg`, {type:"image/jpeg", lastModified:new Date()})]
        const audio = [new File(audioAccepted, `${name}.mp3`, {type:audioAccepted[0].type , lastModified:new Date()})]

        values.mainArtist = artistData.artistName
        values.genres = genres
        values.moods = tags
        values.audio = audio
        values.art = file
        uploadAudio(values)
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
            maxWidthOrHeight: 250,
            useWebWorker: true,
        }

        const compressedFile = await imageCompression(file, options)

        return compressedFile
    }

    useEffect(()=>{
        if(loadingStatus === 1){
            navigate("/home", {replace: true})
        }
    },[loadingStatus])

    useEffect(()=>{
        setArtistData(artist)
    }, [artist])

    return (
      <Stack>
        <MediaQuery
            query="(max-width: 700px)"
            styles={{ flexWrap: "wrap", justifyContent: 'center' }}
        >
            <Group noWrap spacing={48} align='flex-start' sx={{justifyContent: 'center'}} >
                <Stack>
                    <Dropzone
                        padding={0}
                        multiple={false}
                        accept={['image/png', 'image/jpeg']}
                        onDrop={(files) => handleDrop(files, 'image')}
                        onReject={(files) => handleReject(files, 'image')}
                        disabled={artAccepted}
                        loading={coverDropLoad}
                    >
                        {() => coverArtChildren(artAccepted, scale, editor)}
                    </Dropzone>
                    {artAccepted &&
                        <Group grow pt={16}>
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
                    </Group>
                    }
                </Stack>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Stack>
                        <Dropzone
                            accept={['audio/mpeg', 'audio/x-wav']}
                            multiple={false}
                            onDrop={(files) => handleDrop(files, 'audio')}
                            onReject={(files) => handleReject(files, 'audio')}
                            loading={audioDropLoad}
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
                            placeholder={artistData.artistName}
                            value={artistData.artistName}
                            label="Main Artist"
                            radius="md"
                            required
                            disabled
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
