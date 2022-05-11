import React, { useState } from 'react';
import {
  AppShell,
  Container,
  useMantineTheme,
} from '@mantine/core';

import Navbar from './components/Navbar';
import FooterComp from './components/Footer';

export default function Layout({ children }) {
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
      header={<Navbar links={[{label: "Home", link:"home"}, {label: "About", link:"About"}]} />}
    >
        <Container size='lg'>
            {children}
        </Container>
    </AppShell>
  );
}
