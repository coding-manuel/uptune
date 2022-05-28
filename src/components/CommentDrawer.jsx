import React,{useEffect, useContext, useState} from 'react'
import { MusicContext } from '../context/MusicContext';
import { Drawer, Group, Text, Stack, Box, Paper, Button, useMantineTheme } from '@mantine/core';
import { CurrencyEth } from 'phosphor-react';
import { UptuneContext } from '../context/UptuneContext';
import ReactTimeAgo from 'react-time-ago'

const Comment = ({commentData}) => {
    const theme = useMantineTheme()
    return (
    <Paper shadow="sm" p="md" my={12}>
        <Group sx={{justifyContent: 'space-between'}} >
            <Box sx={{border: `1px solid ${theme.colors.gray[8]}`, padding: 16, borderRadius: 4, width: 120}}>
                <Group sx={{justifyContent: 'space-between'}}>
                    <Text size='md' weight={600}>{commentData.amount}</Text>
                    <CurrencyEth size={14} />
                </Group>
            </Box>
            <Stack align='flex-end' sx={{gap: 2}}>
                <Text weight={600}>{commentData.comment}</Text>
                <Text size='xs' weight={600}><ReactTimeAgo date={commentData.timestamp} locale="en-US"/></Text>
            </Stack>
        </Group>
    </Paper>
)}

export default function CommentDrawer({songData}) {
    const {commentDrawer, setCommentDrawer, setModalOpen} = useContext(MusicContext);
    const {getAllComments} = useContext(UptuneContext)

    const [comments, setComments] = useState([]);

    const handleClick = () => {
        setCommentDrawer(false)
        setModalOpen(true)
    }

    useEffect(()=>{
        async function fetchComments() {
            let response = await getAllComments(songData.id)
            if(response)
                setComments(response)
        }
        fetchComments()
    }, [commentDrawer])

    return (
    <Drawer
        position='right'
        opened={commentDrawer}
        onClose={() => setCommentDrawer(false)}
        title="Comments"
        padding="xl"
        size="xl"
        overlayOpacity={0.55}
        overlayBlur={3}
        >
        {comments.length !=0 ? comments.map((c) =>{
            return <Comment commentData={c} />
        }) :
        <Stack>
            <Text>No Comments Yet</Text>
            <Button onClick={handleClick}>Be the First one to comment</Button>
        </Stack>}
        </Drawer>
    )
}
