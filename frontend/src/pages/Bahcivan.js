import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bahcivan.css";

const Bahcivan = () => {
  const [bahcivanListesi, setBahcivanListesi] = useState([]);
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    uzmanlik: "",
    dogum_tarihi: "",
    eposta: "",
    telefon: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Bahçıvanları Getir
  const fetchBahcivanListesi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/bahcivan");
      setBahcivanListesi(response.data.data);
    } catch (error) {
      console.error("Bahçıvan listesi alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchBahcivanListesi();
  }, []);

  // Form Değişikliklerini Yönet
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Yeni Bahçıvan Ekle veya Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/bahcivan/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3001/api/bahcivan", formData);
      }
      setFormData({
        ad: "",
        soyad: "",
        uzmanlik: "",
        dogum_tarihi: "",
        eposta: "",
        telefon: "",
      });
      fetchBahcivanListesi();
    } catch (error) {
      console.error("Bahçıvan eklenirken/güncellenirken hata oluştu:", error);
    }
  };

  // Bahçıvanı Sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/bahcivan/${id}`);
      fetchBahcivanListesi();
    } catch (error) {
      console.error("Bahçıvan silinirken hata oluştu:", error);
    }
  };

  // Güncelleme için Formu Doldur
  const handleEdit = (bahcivan) => {
    setFormData({
      ad: bahcivan.ad,
      soyad: bahcivan.soyad,
      uzmanlik: bahcivan.uzmanlik,
      dogum_tarihi: bahcivan.dogum_tarihi,
      eposta: bahcivan.eposta,
      telefon: bahcivan.telefon,
    });
    setEditingId(bahcivan.bahcivan_id);
  };

  return (
    <div className="bahcivan-container">
      <h1>Bahçıvan Yönetimi</h1>
      <form onSubmit={handleSubmit} className="bahcivan-form">
        <input
          type="text"
          name="ad"
          placeholder="Ad"
          value={formData.ad}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="soyad"
          placeholder="Soyad"
          value={formData.soyad}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="uzmanlik"
          placeholder="Uzmanlık"
          value={formData.uzmanlik}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dogum_tarihi"
          value={formData.dogum_tarihi}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="eposta"
          placeholder="E-posta"
          value={formData.eposta}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefon"
          placeholder="Telefon"
          value={formData.telefon}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Güncelle" : "Ekle"}</button>
      </form>
      <table className="bahcivan-table">
        <thead>
          <tr>
            <th>Bahçıvan ID</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Uzmanlık</th>
            <th>Doğum Tarihi</th>
            <th>E-posta</th>
            <th>Telefon</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {bahcivanListesi.map((bahcivan) => (
            <tr key={bahcivan.bahcivan_id}>
              <td>{bahcivan.bahcivan_id}</td>
              <td>{bahcivan.ad}</td>
              <td>{bahcivan.soyad}</td>
              <td>{bahcivan.uzmanlik}</td>
              <td>{bahcivan.dogum_tarihi}</td>
              <td>{bahcivan.eposta}</td>
              <td>{bahcivan.telefon}</td>
              <td>
                <button onClick={() => handleEdit(bahcivan)}>Güncelle</button>
                <button onClick={() => handleDelete(bahcivan.bahcivan_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bahcivan;
