import React, { useEffect, useState } from 'react';
import './HastalikKatalogu.css';
import axios from 'axios';

const HastalikKatalogu = () => {
  const [hastalikList, setHastalikList] = useState([]);
  const [formData, setFormData] = useState({
    hastalik_adi: '',
    tedavi_yontemi: '',
  });

  // Verileri çekme
  const fetchHastalikKatalogu = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/hastalik_katalogu');
      setHastalikList(response.data.data);
    } catch (error) {
      console.error('Veriler alınamadı:', error);
    }
  };

  // Yeni hastalık ekleme
  const addHastalikKatalogu = async () => {
    try {
      await axios.post('http://localhost:3001/api/hastalik_katalogu', formData);
      setFormData({
        hastalik_adi: '',
        tedavi_yontemi: '',
      });
      fetchHastalikKatalogu();
    } catch (error) {
      console.error('Hastalık eklenemedi:', error);
    }
  };

  // Hastalık kaydını silme
  const deleteHastalikKatalogu = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/hastalik_katalogu/${id}`);
      fetchHastalikKatalogu();
    } catch (error) {
      console.error('Hastalık kaydı silinemedi:', error);
    }
  };

  useEffect(() => {
    fetchHastalikKatalogu();
  }, []);

  return (
    <div className="hastalik-container">
      <h2>Hastalık Kataloğu</h2>
      <div className="hastalik-form">
        <input
          type="text"
          placeholder="Hastalık Adı"
          value={formData.hastalik_adi}
          onChange={(e) => setFormData({ ...formData, hastalik_adi: e.target.value })}
        />
        <textarea
          placeholder="Tedavi Yöntemi"
          value={formData.tedavi_yontemi}
          onChange={(e) => setFormData({ ...formData, tedavi_yontemi: e.target.value })}
        ></textarea>
        <button onClick={addHastalikKatalogu}>Ekle</button>
      </div>
      <table className="hastalik-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hastalık Adı</th>
            <th>Tedavi Yöntemi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {hastalikList.map((item) => (
            <tr key={item.hastalik_id}>
              <td>{item.hastalik_id}</td>
              <td>{item.hastalik_adi}</td>
              <td>{item.tedavi_yontemi}</td>
              <td>
                <button onClick={() => deleteHastalikKatalogu(item.hastalik_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HastalikKatalogu;
