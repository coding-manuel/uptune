import { Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';



function App() {
  return (
    <Routes>
      <Route path='upload' element={<Upload />} />
    </Routes>
  );
}

export default App
