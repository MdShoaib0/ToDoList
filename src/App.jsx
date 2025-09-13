import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import Home from './component/Home/Home';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
  );
}

export default App;