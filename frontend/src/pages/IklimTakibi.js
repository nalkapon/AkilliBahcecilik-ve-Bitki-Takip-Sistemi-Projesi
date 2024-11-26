import React, { useEffect, useState } from 'react';
import './IklimTakibi.css';
import axios from 'axios';

const IklimTakibi = () => {
  const [iklimList, setIklimList] = useState([]);
  const [formData, setFormData] = useState({
    bahce_id: '',
    kayit_tarihi: '',
    sicaklik: '',
    nem: '',
    ruzgar: '',
  });

  // Verileri çekme
  const fetchIklimTakibi = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/iklim_takibi');
      setIklimList(response.data.data);
    } catch (error) {
      console.error('Veriler alınamadı:', error);
    }
  };

  // Yeni iklim kaydı ekleme
  const addIklimTakibi = async () => {
    try {
      await axios.post('http://localhost:3001/api/iklim_takibi', formData);
      setFormData({
        bahce_id: '',
        kayit_tarihi: '',
        sicaklik: '',
        nem: '',
        ruzgar: '',
      });
      fetchIklimTakibi();
    } catch (error) {
      console.error('İklim takibi eklenemedi:', error);
    }
  };

  // İklim kaydı silme
  const deleteIklimTakibi = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/iklim_takibi/${id}`);
      fetchIklimTakibi();
    } catch (error) {
      console.error('İklim kaydı silinemedi:', error);
    }
  };

  useEffect(() => {
    fetchIklimTakibi();
  }, []);

  return (
    <div className="iklim-container">
      <h2>İklim Takibi</h2>
      <div className="iklim-form">
        <input
          type="text"
          placeholder="Bahçe ID"
          value={formData.bahce_id}
          onChange={(e) => setFormData({ ...formData, bahce_id: e.target.value })}
        />
        <input
          type="date"
          placeholder="Kayıt Tarihi"
          value={formData.kayit_tarihi}
          onChange={(e) => setFormData({ ...formData, kayit_tarihi: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sıcaklık (°C)"
          value={formData.sicaklik}
          onChange={(e) => setFormData({ ...formData, sicaklik: e.target.value })}
        />
        <input
          type="number"
          placeholder="Nem (%)"
          value={formData.nem}
          onChange={(e) => setFormData({ ...formData, nem: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rüzgar (km/h)"
          value={formData.ruzgar}
          onChange={(e) => setFormData({ ...formData, ruzgar: e.target.value })}
        />
        <button onClick={addIklimTakibi}>Ekle</button>
      </div>
      <table className="iklim-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Bahçe ID</th>
            <th>Kayıt Tarihi</th>
            <th>Sıcaklık</th>
            <th>Nem</th>
            <th>Rüzgar</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {iklimList.map((item) => (
            <tr key={item.iklim_id}>
              {/* <td>{item.iklim_id}</td> */}
              <td>{item.bahce_id}</td>
              <td>{item.kayit_tarihi}</td>
              <td>{item.sicaklik} °C</td>
              <td>{item.nem} %</td>
              <td>{item.ruzgar} km/h</td>
              <td>
                <button onClick={() => deleteIklimTakibi(item.iklim_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IklimTakibi;
