import { Route, Routes } from 'react-router-dom';

import { changeFavicon } from './utils/faviconChange';
import Upload from './pages/Upload';
import Layout from './layout';
import Home from './pages/Home';
import Song from './pages/Song';

function App() {
  setInterval(() => {
    changeFavicon()
  }, 1000);

  return (
    <Layout>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='upload' element={<Upload />} />
        <Route path='song/:id' element={<Song />} />
      </Routes>
    </Layout>
  );
}

export default App
