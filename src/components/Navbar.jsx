import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createStyles, Header, ActionIcon, Container, Group, Avatar, Tooltip, Text } from '@mantine/core';
import { UptuneContext } from '../context/UptuneContext'
import { Plus } from "phosphor-react"

import { shortenAddress } from '../utils/shortenAddress'
import Logo from "../assets/Logo_White.svg";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {
  const {currentAccount, connectWallet, artist} = useContext(UptuneContext);
  const { classes, cx } = useStyles();
  const [artistData, setArtistData] = useState({});
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/home")
  }

  useEffect(()=>{
    setArtistData(artist)
  }, [artist])

  return (
    <Header fixed height={HEADER_HEIGHT} className={classes.root}>
      <Container size='lg' className={classes.header}>
        <img onClick={handleLogoClick} style={{height: 30, cursor: "pointer"}} src={Logo} alt="" />
        <Group spacing={24}>
          <Tooltip
            label={<Text size='xs' weight={600}>Upload</Text>}
            withArrow
            gutter={10}
          >
            <ActionIcon component={Link} to='upload' variant="light" sx={{padding: 4}}>
              <Plus size={24} weight="fill" />
            </ActionIcon>
          </Tooltip>
          <Avatar sx={{cursor: "pointer"}} size='sm' src={artist.profilegateway} alt={artist.artistName} />
        </Group>
      </Container>
    </Header>
  )
}
