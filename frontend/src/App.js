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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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

// Ana Sayfa
const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Bahçenizi Verimli Yönetin</h1>
      <p>
        Bahçecilik ve bitki takibi sistemimize hoş geldiniz! Bahçenizdeki bitkiler, sulama,
        gübreleme ve hastalık takibini kolayca yönetebilirsiniz.
      </p>
      <p>
        Sistem genelinde analizler ve raporlarla bahçenizi verimli bir şekilde yönetmek için
        araçlar sağlıyoruz.
      </p>
      <div className="button-container">
        <button className="start-button">
          <a href="/bahce">Başlayın</a>
        </button>
      </div>
    </div>
  );
};

export default App;
