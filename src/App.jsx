import { Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/Home';
import ManageNamaz from './pages/ManageNamaz';
import Tasbih from './pages/Tasbih';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Namaz' element={<ManageNamaz />} />
        <Route path='/Tasbih' element={<Tasbih />} />
      </Routes>
  );
}

export default App;