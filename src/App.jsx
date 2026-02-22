import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Namaz from "./pages/Namaz";
import Tasbih from "./pages/Tasbih";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Namaz" element={<Namaz />} />
        <Route path="/Tasbih" element={<Tasbih />} />
      </Routes>
    </BrowserRouter>
  );
}