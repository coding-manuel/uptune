import { useEffect, useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';

import { changeFavicon } from './utils/faviconChange';
import Upload from './pages/Upload';
import Layout from './layout';
import Home from './pages/Home';
import Song from './pages/Song';
import Artist from './pages/Artist';
import Genre from './pages/Genre';

import TipModal from './components/TipModal';
import CommentDrawer from './components/CommentDrawer';
import { MusicContext } from './context/MusicContext';

function App() {
  const {songData} = useContext(MusicContext);

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const theme = {
    colorScheme: colorScheme,
    shadows: {
      md: '1px 1px 3px rgba(0,0,0,.25)',
      xl: '5px 5px 3px rgba(0,0,0,.25)',
    },
    primaryColor: 'red',
    primaryShade: 8,

    lineHeight: 1.3,
    headings: {
      fontFamily: 'Sora, sans-serif',
      sizes: {
        h1: {fontSize: '5.653rem'},
        h2: {fontSize: '3.998rem'},
        h3: {fontSize: '2.827rem'},
        h4: {fontSize: '1.999rem'},
        h5: {fontSize: '1.414rem'},
        h6: {fontSize: '0.707rem'}
      },
    },
  }

  setInterval(() => {
    changeFavicon()
  }, 1000);

  const [song, setSong] = useState([]);

  useEffect(() => {
    setSong(songData)
  }, [songData]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} styles={{ Title: { root: { color: "#ffffff"} } }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <Layout>
            <CommentDrawer songData={song} />
            <TipModal />
            <Routes>
              <Route path='home' element={<Home />} />
              <Route path='upload' element={<Upload />} />
              <Route path='artist/:id' element={<Artist />} />
              <Route path='song/:id' element={<Song />} />
              <Route path='genre/:genre' element={<Genre />} />
            </Routes>
          </Layout>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
