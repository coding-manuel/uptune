import { useEffect, useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { changeFavicon } from './utils/faviconChange';
import Upload from './pages/Upload';
import Layout from './layout';
import Home from './pages/Home';
import Song from './pages/Song';

import TipModal from './components/TipModal';
import CommentDrawer from './components/CommentDrawer';
import { UptuneContext } from './context/UptuneContext';
import { MusicContext } from './context/MusicContext';
import Artist from './pages/Artist';

function App() {
  const {getAllAudio, loading, getOneAudio, getArtistSongs} = useContext(UptuneContext);
  const {songData} = useContext(MusicContext);

  setInterval(() => {
    changeFavicon()
  }, 1000);

  const [song, setSong] = useState([]);

  useEffect(() => {
    setSong(songData)
  }, [songData]);

  return (
    <Layout>
      <CommentDrawer songData={song} />
      <TipModal />
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='upload' element={<Upload />} />
        <Route path='artist/:id' element={<Artist />} />
        <Route path='song/:id' element={<Song />} />
      </Routes>
    </Layout>
  );
}

export default App
