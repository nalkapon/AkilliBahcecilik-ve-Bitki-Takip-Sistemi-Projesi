import React, { useEffect, useState } from 'react';
import './TurKatalogu.css';
import axios from 'axios';

const TurKatalogu = () => {
  const [turList, setTurList] = useState([]);
  const [formData, setFormData] = useState({
    tur_adi: '',
    sulama_sikligi: '',
  });

  // Verileri çekme
  const fetchTurKatalogu = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tur_katalogu');
      setTurList(response.data.data);
    } catch (error) {
      console.error('Veriler alınamadı:', error);
    }
  };

  // Yeni tür ekleme
  const addTurKatalogu = async (turAdi, sulamaSikligi) => {
    try {
        // Yalnızca gereken verileri gönderiyoruz
        const response = await axios.post('http://localhost:3001/api/tur_katalogu', {
            tur_adi: turAdi,
            sulama_sikligi: sulamaSikligi // Bu, sadece metin veya ENUM değerini alır
        });
        console.log(response.data);
    } catch (error) {
        console.error('Hata:', error.response ? error.response.data : error.message);
    }
};



  // Tür kaydı silme
  const deleteTurKatalogu = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tur_katalogu/${id}`);
      fetchTurKatalogu();
    } catch (error) {
      console.error('Tür kaydı silinemedi:', error);
    }
  };

  useEffect(() => {
    fetchTurKatalogu();
  }, []);

  return (
    <div className="tur-container">
      <h2>Tür Kataloğu</h2>
      <div className="tur-form">
        <input
          type="text"
          placeholder="Tür Adı"
          value={formData.tur_adi}
          onChange={(e) => setFormData({ ...formData, tur_adi: e.target.value })}
        />
        <input
          type="text"
          placeholder="Sulama Sıklığı"
          value={formData.sulama_sikligi}
          onChange={(e) => setFormData({ ...formData, sulama_sikligi: e.target.value })}
        />
        <button onClick={addTurKatalogu}>Ekle</button>
      </div>
      <table className="tur-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tür Adı</th>
            <th>Sulama Sıklığı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {turList.map((item) => (
            <tr key={item.tur_id}>
              <td>{item.tur_id}</td>
              <td>{item.tur_adi}</td>
              <td>{item.sulama_sikligi}</td>
              <td>
                <button onClick={() => deleteTurKatalogu(item.tur_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TurKatalogu;
