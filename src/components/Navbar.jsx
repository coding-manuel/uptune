import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, Header, ActionIcon, Container, Group, Burger, Paper, Transition, Button, Text } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
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

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

export default function Navbar({ links }) {
  const {currentAccount, connectWallet} = useContext(UptuneContext);
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        setActive(link.link);
        toggleOpened(false);
      }}
    >
      {link.label}
    </Link>
  ));

  const Account = (mobile) => {
    if(!mobile){
      return(
      !currentAccount ?
      <Button onClick={connectWallet} radius="md" size="xs">
        Connect Wallet
      </Button> :
      <Paper shadow="xs" p="xs"><Text size='sm'>{shortenAddress(currentAccount)}</Text></Paper>
      )
    }
    else{
      return(
      !currentAccount ?
      <Button onClick={connectWallet} radius="xs" size="sm" fullWidth>
        Connect Wallet
      </Button> :
      <Paper shadow="xs" p="md">Address: {shortenAddress(currentAccount)}</Paper>
      )
    }
  }

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size='lg' className={classes.header}>
        <img style={{height: 30}} src={Logo} alt="" />
        <Group spacing={24}>
          <Group spacing={5} className={classes.links}>
            {items}
            {Account(false)}
          </Group>
          <Group>
            <ActionIcon component={Link} to='upload' variant="light" sx={{padding: 4}}>
              <Plus size={24} weight="fill" />
            </ActionIcon>
            <Burger
              opened={opened}
              onClick={() => toggleOpened()}
              className={classes.burger}
              size="sm"
            />
          </Group>
        </Group>


        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {Account(true)}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
