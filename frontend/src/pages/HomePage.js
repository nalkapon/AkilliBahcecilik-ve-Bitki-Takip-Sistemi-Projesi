import React from 'react';
import './HomePage.css'; 
import bahceImage from '../assets/bahce.jpeg';
import bahcivanImage from '../assets/bahcivan.jpeg'; 
import bitkiImage from '../assets/bitki.jpeg'; 
import gülImage from '../assets/gül.jpeg'; 
import papatyaImage from '../assets/papatya.jpeg'; 
import bahcivan2Image from '../assets/bahcivan2.jpeg'; 

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Bahçenizi Verimli Yönetin</h1>
        <p>Bahçecilik ve bitki takibi sistemimize hoş geldiniz!</p>
      </header>

      <section className="intro">
        <h2>Bahçenizdeki Bitkileri Yönetin</h2>
        <p>Bahçenizdeki bitkiler, bakımlar, sulama planları ve daha fazlası burada!</p>
        <div className="intro-image">
          <img src={bahceImage} alt="Bahçe Görseli" />
        </div>
      </section>

      <section id="bitkiler" className="card-section">
        <h2>Bitkiler</h2>
        <div className="card">
          <img src={gülImage} alt="Bitki Görseli" />
          {/* <h3>Bitki 1</h3> */}
          {/* <p>Bitki açıklaması buraya gelecek.</p> */}
        </div>
        <div className="card">
          <img src={papatyaImage} alt="Bitki Görseli" />
          {/* <h3>Bitki 2</h3> */}
          {/* <p>Bitki açıklaması buraya gelecek.</p> */}
        </div>
      </section>

      <section id="bahcivanlar" className="card-section">
        <h2>Bahçıvanlar</h2>
        <div className="card">
          <img src={bahcivanImage} alt="Bahçıvan Görseli" />
          {/* <h3>Bahçıvan 1</h3> */}
          {/* <p>Bahçıvan açıklaması buraya gelecek.</p> */}
        </div>
        <div className="card">
          <img src={bahcivan2Image} alt="Bahçıvan Görseli" />
          {/* <h3>Bahçıvan 2</h3> */}
          {/* <p>Bahçıvan açıklaması buraya gelecek.</p> */}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Bahçe Yönetimi | Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
};

export default HomePage;
