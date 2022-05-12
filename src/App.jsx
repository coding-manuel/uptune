import { Route, Routes } from 'react-router-dom';

import { changeFavicon } from './utils/faviconChange';
import Upload from './pages/Upload';
import Layout from './layout';
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
