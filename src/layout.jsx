import React, { useState, useContext } from 'react';
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
import FooterComp from './components/Footer';
import { UptuneContext } from './context/UptuneContext';

export default function Layout({ children }) {
  const {currentAccount, loading, connectWallet} = useContext(UptuneContext);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '20px',
        },
      }}
      fixed
      footer={<FooterComp />}
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
