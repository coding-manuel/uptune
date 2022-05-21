import React, { useState, useContext, useEffect } from 'react';
import {
  AppShell,
  Container,
  useMantineTheme,
  Modal,
  Button,
  Text,
  Stack,
  LoadingOverlay
} from '@mantine/core';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Player from './components/Player'
import { UptuneContext } from './context/UptuneContext';
import CreateArtist from "./components/CreateArtist"


export default function Layout({ children }) {
  const {artistExist, currentAccount, loading, connectWallet, mainLoader} = useContext(UptuneContext);
  const theme = useMantineTheme();
  const [localMainLoader, setLocalMainLoader] = useState(false);

  useEffect(()=>{
    setLocalMainLoader(mainLoader)
  }, [mainLoader])

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '20px',
        },
      }}
      fixed
      footer={<Player />}
      header={<Navbar />}
    >
      <LoadingOverlay loaderProps={{ size: 'sm' }} overlayOpacity={.9} transitionDuration={500} visible={localMainLoader} />
      <Container size='lg' pb={100} >
        {!currentAccount ? <Modal
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={!currentAccount}
          withCloseButton={false}
          centered
          size='xs'
        >
          <Stack>
            <Text align='center' size='sm'>To access the website connect your metamask wallet</Text>
            <Button loading={loading} onClick={connectWallet} radius="md" size="xs">
              Connect Wallet
            </Button>
          </Stack>
        </Modal>
        : !artistExist ?
          <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={!artistExist}
            withCloseButton={false}
            centered
            size='xs'
        >
            <CreateArtist />
        </Modal> :
          children
        }
      </Container>
    </AppShell>
  );
}
