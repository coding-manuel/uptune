import { Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Layout from './layout';

import { changeFavicon } from './utils/faviconChange';
import Home from './pages/Home';

function App() {
  setInterval(() => {
    changeFavicon()
  }, 1000);

  return (
    <Layout>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='upload' element={<Upload />} />
      </Routes>
    </Layout>
  );
}

export default App
