import React, { useEffect, useState } from 'react';
import './HastalikTakibi.css';
import axios from 'axios';

const HastalikTakibi = () => {
  const [hastalikTakibiList, setHastalikTakibiList] = useState([]);
  const [formData, setFormData] = useState({
    bitki_id: '',
    hastalik_id: '',
    hastalik_tarihi: '',
    notlar: '',
  });

  // Verileri çekme
  const fetchHastalikTakibi = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/hastalik_takibi');
      setHastalikTakibiList(response.data.data);
    } catch (error) {
      console.error('Veriler alınamadı:', error);
    }
  };

  // Yeni hastalık takibi ekleme
  const addHastalikTakibi = async () => {
    try {
      await axios.post('http://localhost:3001/api/hastalik_takibi', formData);
      setFormData({
        bitki_id: '',
        hastalik_id: '',
        hastalik_tarihi: '',
        notlar: '',
      });
      fetchHastalikTakibi();
    } catch (error) {
      console.error('Hastalık takibi eklenemedi:', error);
    }
  };

  // Hastalık takibi silme
  const deleteHastalikTakibi = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/hastalik_takibi/${id}`);
      fetchHastalikTakibi();
    } catch (error) {
      console.error('Hastalık takibi silinemedi:', error);
    }
  };

  useEffect(() => {
    fetchHastalikTakibi();
  }, []);

  return (
    <div className="hastalik-container">
      <h2>Hastalık Takibi</h2>
      <div className="hastalik-form">
        <input
          type="text"
          placeholder="Bitki ID"
          value={formData.bitki_id}
          onChange={(e) => setFormData({ ...formData, bitki_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Hastalık ID"
          value={formData.hastalik_id}
          onChange={(e) => setFormData({ ...formData, hastalik_id: e.target.value })}
        />
        <input
          type="date"
          placeholder="Hastalık Tarihi"
          value={formData.hastalik_tarihi}
          onChange={(e) => setFormData({ ...formData, hastalik_tarihi: e.target.value })}
        />
        <textarea
          placeholder="Notlar"
          value={formData.notlar}
          onChange={(e) => setFormData({ ...formData, notlar: e.target.value })}
        ></textarea>
        <button onClick={addHastalikTakibi}>Ekle</button>
      </div>
      <table className="hastalik-table">
        <thead>
          <tr>
            <th>Bitki ID</th>
            <th>Hastalık ID</th>
            <th>Tarih</th>
            <th>Notlar</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {hastalikTakibiList.map((item) => (
            <tr key={item.hastalik_takibi_id}>
              <td>{item.bitki_id}</td>
              <td>{item.hastalik_id}</td>
              <td>{item.hastalik_tarihi}</td>
              <td>{item.notlar}</td>
              <td>
                <button onClick={() => deleteHastalikTakibi(item.hastalik_takibi_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HastalikTakibi;
