import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Bahce from "./pages/Bahce";
import Gubre from "./pages/Gubre";
import SulamaPlani from "./pages/SulamaPlani";
import Bakim from "./pages/Bakim";
import Bahcivan from "./pages/Bahcivan";
import Gubreleme from './pages/Gubreleme';
import HastalikTakibi from './pages/HastalikTakibi';
import IklimTakibi from './pages/IklimTakibi';
import TurKatalogu from './pages/TurKatalogu';
import Raporlar from './pages/Raporlar';
import HastalikKatalogu from './pages/HastalikKatalogu';
import BahcivanBahce from './pages/BahcivanBahce';
import Bitki from "./pages/Bitki";
import './App.css';
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Ana sayfayı doğru şekilde ekledik */}
        <Route path="/gubre" element={<Gubre />} />
        <Route path="/bitki" element={<Bitki />} />
        <Route path="/raporlar" element={<Raporlar />} />
        <Route path="/bahce" element={<Bahce />} />
        <Route path="/sulama-plani" element={<SulamaPlani />} />
        <Route path="/bakim" element={<Bakim />} />
        <Route path="/bahcivan" element={<Bahcivan />} />
        <Route path="/gubreleme" element={<Gubreleme />} />
        <Route path="/hastalik-takibi" element={<HastalikTakibi />} />
        <Route path="/iklim-takibi" element={<IklimTakibi />} />
        <Route path="/tur-katalogu" element={<TurKatalogu />} />
        <Route path="/hastalik-katalogu" element={<HastalikKatalogu />} />
        <Route path="/bahcivan-bahce" element={<BahcivanBahce />} />
      </Routes>
    </Router>
  );
};

export default App;
