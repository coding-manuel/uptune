import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createStyles, Menu, Header, ActionIcon, Container, Group, Avatar, Tooltip, Text, useMantineColorScheme, Switch } from '@mantine/core';
import { UptuneContext } from '../context/UptuneContext'
import { Plus, User, MoonStars } from "phosphor-react"

import LogoWhite from "../assets/Logo_White.svg";
import Logo from "../assets/Logo.svg"

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
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();

  const [checked, setChecked] = useState(false);

  const handleLogoClick = () => {
    navigate("/home")
  }
  const handleToggle = () => {
    toggleColorScheme()
  }

  useEffect(()=>{
    colorScheme === 'dark' ? setChecked(true) : setChecked(false)
  }, [colorScheme])

  useEffect(()=>{
    setArtistData(artist)
  }, [artist])

  return (
    <Header fixed height={HEADER_HEIGHT} className={classes.root}>
      <Container size='lg' className={classes.header}>
        <img onClick={handleLogoClick} style={{height: 30, cursor: "pointer"}} src={colorScheme == 'dark' ? LogoWhite: Logo} alt="" />
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
          <Menu placement='end' closeOnItemClick={false} control={<Avatar sx={{cursor: "pointer"}} size='sm' src={artist.profilegateway} alt={artist.artistName} />} styles={{itemLabel: {width: '100%'}}}>
            <Menu.Item component={Link} to={`/artist/${currentAccount}`} icon={<User size={16} weight="regular" />}>Your Profile</Menu.Item>
            <Menu.Item icon={<MoonStars size={16} weight="regular" />}><Switch checked={checked} onChange={handleToggle} styles={{root:{flexDirection: 'row-reverse', justifyContent: 'space-between', width: '100%'}, label:{paddingLeft: 0, paddingRight: 8}}} label="Dark Mode" /></Menu.Item>
          </Menu>
        </Group>
      </Container>
    </Header>
  )
}
