import React, {useContext, useState, useEffect} from 'react'
import { Stack, Modal, Text, Image, NumberInput, Button, Group, LoadingOverlay } from '@mantine/core';
import { PaperPlaneRight, Check } from 'phosphor-react';
import { useForm } from '@mantine/form'
import { MusicContext } from '../context/MusicContext';
import { UptuneContext } from '../context/UptuneContext';

export default function TipModal() {
    const {songData, modalOpen, setModalOpen} = useContext(MusicContext);
    const {sendTip, tipLoading} = useContext(UptuneContext)

    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [song, setSong] = useState(false);

    const form = useForm({
        initialValues: {
            tip : 0
        }
    })

    const handleClose = () => {
        setModalOpen(false)
    }

    const handleSubmit = (values) => {
        sendTip({id: songData.id, tip: values.tip, wallet: songData.wallet})
    }

    useEffect(() => {
        setOpen(modalOpen)
    }, [modalOpen]);

    useEffect(() => {
        setSong(songData)
    }, [songData]);

    return (
        <Modal
            transition="pop"
            duration={400}
            timingFunction="ease"
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={open}
            size='xs'
            onClose={handleClose}
            title="Tip Artist"
        >
            <LoadingOverlay visible={!loaded} />
            <form style={{padding: '0 8px'}} onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack my={24} align='center'>
                    <Image onLoad={() => setLoaded(true)} src={song.coverartgateway} sx={{height: '100%', width: '100%', objectFit: 'cover'}} radius='sm' alt={song.title}/>
                </Stack>
                <Stack sx={{gap: 2}}>
                    <Text size='md' weight={700}>{song.title}</Text>
                    <Text size='sm' weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis'}}>{song.mainArtist}{song.supportArtist != [] && ',' + song.supportArtist}</Text>
                    <Group noWrap my={24} align='flex-end'>
                        {tipLoading === 1 ? <Button>Sent<Check style={{paddingLeft: 4}} size={20} weight="fill" /></Button> :
                        <>
                            <NumberInput
                                placeholder="1.035"
                                label="Amount (in ETH)"
                                required
                                hideControls
                                min={0}
                                precision={4}
                                sx={{width: '100%'}}
                                {...form.getInputProps('tip')}
                            />
                            <Button loading={tipLoading} type='submit'>Send<PaperPlaneRight style={{paddingLeft: 4}} size={20} weight="fill" /></Button>
                        </>
                        }
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}
