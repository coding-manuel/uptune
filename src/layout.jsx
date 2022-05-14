import React, { useState, useContext, useEffect } from 'react';
import {
  AppShell,
  Container,
  useMantineTheme,
  Modal,
  Button,
  Text,
  Stack
} from '@mantine/core';

import Navbar from './components/Navbar';
import Player from './components/Player'
import { UptuneContext } from './context/UptuneContext';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const {checkIfUpload, upload, currentAccount, loading, connectWallet} = useContext(UptuneContext);
  const location = useLocation()
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);


  useEffect(() => {
    checkIfUpload()
  }, [location.pathname]);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '20px',
        },
      }}
      fixed
      footer={!upload && <Player />}
      header={<Navbar links={[{label: "Home", link:"home"}, {label: "Explore", link:"Explore"}]} />}
    >
        <Container size='lg'>
          {!currentAccount ? <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
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
          :
            children
          }
        </Container>
    </AppShell>
  );
}
