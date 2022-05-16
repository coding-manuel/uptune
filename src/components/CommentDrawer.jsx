import React,{useEffect, useContext, useState} from 'react'
import { MusicContext } from '../context/MusicContext';
import { Drawer, Group, Text, Stack, Box, Paper } from '@mantine/core';
import { CurrencyEth } from 'phosphor-react';
import { UptuneContext } from '../context/UptuneContext';
import ReactTimeAgo from 'react-time-ago'

const Comment = ({commentData}) => {
    return (
    <Group sx={{justifyContent: 'space-between'}} my={12}>
        <Box sx={{backgroundColor: '#353535', padding: 16, borderRadius: 4, width: 120}}>
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
)}

export default function CommentDrawer({songData}) {
    const {commentDrawer, setCommentDrawer} = useContext(MusicContext);
    const {getAllComments} = useContext(UptuneContext)

    const [comments, setComments] = useState([]);

    useEffect(()=>{
        async function fetchComments() {
            let response = await getAllComments(songData.id)
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
        {comments.length !=0 && comments.map((c) =>{
            return <Comment commentData={c} />
        })}
        </Drawer>
    )
}
