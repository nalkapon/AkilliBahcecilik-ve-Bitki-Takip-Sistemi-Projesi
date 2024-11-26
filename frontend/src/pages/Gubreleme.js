import React, { useEffect, useState } from 'react';
import './Gubreleme.css';
import axios from 'axios';

const Gubreleme = () => {
  const [gubrelemeList, setGubrelemeList] = useState([]);
  const [formData, setFormData] = useState({
    gubreleme_tarihi: '',
    gubre_id: '',
    miktar: '',
    bitki_id: '',
  });

  // Verileri çekme
  const fetchGubreleme = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/gubreleme');
      setGubrelemeList(response.data.data);
    } catch (error) {
      console.error('Veriler alınamadı:', error);
    }
  };

  // Yeni gübreleme ekleme
  const addGubreleme = async () => {
    // Kontroller
    if (formData.miktar <= 0) {
      alert("Miktar sıfırdan büyük olmalıdır!");
      return;
    }

    if (formData.gubre_id <= 0 || formData.bitki_id <= 0) {
      alert("Gübre ID ve Bitki ID sıfırdan büyük olmalıdır!");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/gubreleme', formData);
      setFormData({
        gubreleme_tarihi: '',
        gubre_id: '',
        miktar: '',
        bitki_id: '',
      });
      fetchGubreleme();
    } catch (error) {
      console.error('Gübreleme eklenemedi:', error);
    }
  };

  // Gübreleme silme
  const deleteGubreleme = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/gubreleme/${id}`);
      fetchGubreleme();
    } catch (error) {
      console.error('Gübreleme silinemedi:', error);
    }
  };

  useEffect(() => {
    fetchGubreleme();
  }, []);

  return (
    <div className="gubreleme-container">
      <h2>Gübreleme Planı</h2>
      <div className="gubreleme-form">
        <input
          type="date"
          placeholder="Tarih"
          value={formData.gubreleme_tarihi}
          onChange={(e) => setFormData({ ...formData, gubreleme_tarihi: e.target.value })}
        />
        <input
          type="number"
          placeholder="Gübre ID"
          value={formData.gubre_id}
          onChange={(e) => setFormData({ ...formData, gubre_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Miktar (kg)"
          value={formData.miktar}
          onChange={(e) => setFormData({ ...formData, miktar: e.target.value })}
        />
        <input
          type="number"
          placeholder="Bitki ID"
          value={formData.bitki_id}
          onChange={(e) => setFormData({ ...formData, bitki_id: e.target.value })}
        />
        <button onClick={addGubreleme}>Ekle</button>
      </div>
      <table className="gubreleme-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Tarih</th>
            <th>Gübre ID</th>
            <th>Miktar</th>
            <th>Bitki ID</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {gubrelemeList.map((gubreleme) => (
            <tr key={gubreleme.gubreleme_id}>
              {/* <td>{gubreleme.gubreleme_id}</td> */}
              <td>{gubreleme.gubreleme_tarihi}</td>
              <td>{gubreleme.gubre_id}</td>
              <td>{gubreleme.miktar}</td>
              <td>{gubreleme.bitki_id}</td>
              <td>
                <button onClick={() => deleteGubreleme(gubreleme.gubreleme_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gubreleme;
