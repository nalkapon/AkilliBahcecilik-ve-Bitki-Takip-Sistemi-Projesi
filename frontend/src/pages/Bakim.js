import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bakim.css";

const Bakim = () => {
  const [bakimListesi, setBakimListesi] = useState([]);
  const [formData, setFormData] = useState({
    bitki_id: "",
    bahcivan_id: "",
    bakim_turu: "",
    bakim_tarihi: "",
    aciklama: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Bakım Listesini Getir
  const fetchBakimListesi = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/bakim");
      setBakimListesi(response.data.data);
    } catch (error) {
      console.error("Bakım listesi alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchBakimListesi();
  }, []);

  // Form Değişikliklerini Yönet
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Yeni Bakım Ekle veya Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/bakim/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3001/api/bakim", formData);
      }
      setFormData({
        bitki_id: "",
        bahcivan_id: "",
        bakim_turu: "",
        bakim_tarihi: "",
        aciklama: "",
      });
      fetchBakimListesi();
    } catch (error) {
      console.error("Bakım eklenirken/güncellenirken hata oluştu:", error);
    }
  };

  // Bakımı Sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/bakim/${id}`);
      fetchBakimListesi();
    } catch (error) {
      console.error("Bakım silinirken hata oluştu:", error);
    }
  };

  // Güncelleme için Formu Doldur
  const handleEdit = (bakim) => {
    setFormData({
      bitki_id: bakim.bitki_id,
      bahcivan_id: bakim.bahcivan_id,
      bakim_turu: bakim.bakim_turu,
      bakim_tarihi: bakim.bakim_tarihi,
      aciklama: bakim.aciklama,
    });
    setEditingId(bakim.bakim_id);
  };

  return (
    <div className="bakim-container">
      <h1>Bakım Yönetimi</h1>
      <form onSubmit={handleSubmit} className="bakim-form">
        <input
          type="number"
          name="bitki_id"
          placeholder="Bitki ID"
          value={formData.bitki_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bahcivan_id"
          placeholder="Bahçıvan ID"
          value={formData.bahcivan_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bakim_turu"
          placeholder="Bakım Türü"
          value={formData.bakim_turu}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="bakim_tarihi"
          value={formData.bakim_tarihi}
          onChange={handleChange}
          required
        />
        <textarea
          name="aciklama"
          placeholder="Açıklama"
          value={formData.aciklama}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Güncelle" : "Ekle"}</button>
      </form>
      <table className="bakim-table">
        <thead>
          <tr>
            <th>Bakım ID</th>
            <th>Bitki ID</th>
            <th>Bahçıvan ID</th>
            <th>Bakım Türü</th>
            <th>Bakım Tarihi</th>
            <th>Açıklama</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {bakimListesi.map((bakim) => (
            <tr key={bakim.bakim_id}>
              <td>{bakim.bakim_id}</td>
              <td>{bakim.bitki_id}</td>
              <td>{bakim.bahcivan_id}</td>
              <td>{bakim.bakim_turu}</td>
              <td>{bakim.bakim_tarihi}</td>
              <td>{bakim.aciklama}</td>
              <td>
                <button onClick={() => handleEdit(bakim)}>Güncelle</button>
                <button onClick={() => handleDelete(bakim.bakim_id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bakim;
