import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Raporlar.css';

const Raporlar = () => {
  const [bitkiSayisi, setBitkiSayisi] = useState(0);
  const [gubrelemeSikligi, setGubrelemeSikligi] = useState([]);
  const [hastaliklar, setHastaliklar] = useState([]);

  // Raporları almak için API isteği
  useEffect(() => {
    axios.get('http://localhost:3001/api/bitki')
      .then(response => setBitkiSayisi(response.data.data.length))
      .catch(error => console.error('Bitkiler alınırken hata:', error));

    axios.get('http://localhost:3001/api/gubreleme')
      .then(response => setGubrelemeSikligi(response.data.data))
      .catch(error => console.error('Gübreleme verileri alınırken hata:', error));

    axios.get('http://localhost:3001/api/hastalik_takibi')
      .then(response => setHastaliklar(response.data.data))
      .catch(error => console.error('Hastalık verileri alınırken hata:', error));
  }, []);

  return (
    <div>
      <h1>Genel Raporlar</h1>
      <div>
        <h2>Toplam Bitki Sayısı: {bitkiSayisi}</h2>
      </div>
      <div>
        <h3>Gübreleme Sıklıkları</h3>
        <ul>
          {gubrelemeSikligi.map((gubre, index) => (
            <li key={index}>
              {gubre.gubreleme_tarihi}: {gubre.gubre_id} - {gubre.miktar} kg
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>En Sık Görülen Hastalıklar</h3>
        <ul>
          {hastaliklar.map((hastalik, index) => (
            <li key={index}>
              {hastalik.hastalik_adi}: {hastalik.tedavi_yonetimi}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Raporlar;
