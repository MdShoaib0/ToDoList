import { Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/Home';
import ManageNamaz from './pages/ManageNamaz';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/namaz' element={<ManageNamaz />} />
      </Routes>
  );
}

export default App;