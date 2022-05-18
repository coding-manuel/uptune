import React, {useContext, useState, useEffect, useRef} from 'react'
import { Stack, Modal, Text, Image, NumberInput, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import { PaperPlaneRight, Check, CurrencyEth } from 'phosphor-react';
import { useForm } from '@mantine/form'
import { MusicContext } from '../context/MusicContext';
import { UptuneContext } from '../context/UptuneContext';

export default function TipModal() {
    const {songData, modalOpen, setModalOpen} = useContext(MusicContext);
    const {sendTip, tipLoading, setTipLoading} = useContext(UptuneContext)

    const ref = useRef(null)

    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [song, setSong] = useState(false);
    const [value, setValue] = useState(0);

    const form = useForm({
        initialValues: {
            tip : 0,
            message: ""
        },
        validate: {
            tip: (value) => value === 0 ? "Tip cannot be 0" : null,
        }
    })

    const handleClose = () => {
        setModalOpen(false)
        setTipLoading(false)
    }

    const handleSubmit = (values) => {
        sendTip({id: songData.id, tip: values.tip, wallet: songData.wallet, message: values.message})
    }

    const addTip = (val) => {
        console.log(value, val)
        setValue((parseFloat(value) + val).toPrecision(4).toString())
        console.log(ref.current.value)
        ref.current.value = value
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
                <Stack my={12} align='center'>
                    <Image onLoad={() => setLoaded(true)} src={song.coverartgateway} sx={{height: '100%', width: '100%', objectFit: 'cover'}} radius='sm' alt={song.title}/>
                </Stack>
                <Stack sx={{gap: 2}}>
                    <Text size='md' weight={700}>{song.title}</Text>
                    <Text size='sm' weight={500} sx={{paddingRight: 15, whiteSpace: 'noWrap', overflow: 'hidden',  textOverflow: 'ellipsis'}}>{song.mainArtist}{song.supportArtist != [] && ',' + song.supportArtist}</Text>
                    {tipLoading === 1 ? <Button>Sent<Check style={{paddingLeft: 4}} size={20} weight="fill" /></Button> :
                    <Stack my={24}>
                        <TextInput
                            placeholder="Boht Hard"
                            label="Message"
                            radius="md"
                            required
                            {...form.getInputProps('message')}
                        />
                        <Group noWrap align='flex-end'>
                            <NumberInput
                                placeholder="1.035"
                                label="Amount (in ETH)"
                                required
                                hideControls
                                min={0}
                                precision={4}
                                icon={<CurrencyEth size={16} />}
                                {...form.getInputProps('tip')}
                            />
                            <Button loading={tipLoading} type='submit'>Send<PaperPlaneRight style={{paddingLeft: 4}} size={20} weight="fill" /></Button>
                        </Group>
                        {/* <Stack spacing='xs'>
                            <Text size='xs'>Suggested Tips</Text>
                            <Group grow>
                                <Button color="gray" size='xs' variant='outline' compact onClick={() => addTip(0.3)}>+ 0.3 ETH</Button>
                                <Button color="gray" size='xs' variant='outline' compact onClick={() => addTip(0.5)}>+ 0.5 ETH</Button>
                                <Button color="gray" size='xs' variant='outline' compact onClick={() => addTip(1)}>+ 1 ETH</Button>
                            </Group>
                        </Stack> */}
                    </Stack>
                    }
                </Stack>
            </form>
        </Modal>
    )
}
