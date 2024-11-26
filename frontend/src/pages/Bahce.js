import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bahce.css";

const Bahce = () => {
  const [bahceler, setBahceler] = useState([]);
  const [formData, setFormData] = useState({
    bahce_adi: "",
    konum: "",
    alan_buyuklugu: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Verileri çekme
  useEffect(() => {
    fetchBahceler();
  }, []);

  const fetchBahceler = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/bahce");
      setBahceler(response.data.data);
    } catch (error) {
      console.error("Veriler alınamadı:", error);
    }
  };

  // Formdaki verileri işleme
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Yeni bahçe ekleme veya güncelleme
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Doğrulama: Alan Büyüklüğü
    if (formData.alan_buyuklugu <= 0) {
      alert("Alan büyüklüğü sıfırdan büyük olmalıdır!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/bahce/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3001/api/bahce", formData);
      }
      setFormData({ bahce_adi: "", konum: "", alan_buyuklugu: "" });
      fetchBahceler();
    } catch (error) {
      console.error("Bahçe eklenirken/güncellenirken hata oluştu:", error);
    }
  };

  // Bahçe silme
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/bahce/${id}`);
      fetchBahceler();
    } catch (error) {
      console.error("Bahçe silinirken hata oluştu:", error);
    }
  };

  // Güncelleme için form doldurma
  const handleEdit = (bahce) => {
    setEditingId(bahce.bahce_id);
    setFormData({
      bahce_adi: bahce.bahce_adi,
      konum: bahce.konum,
      alan_buyuklugu: bahce.alan_buyuklugu,
    });
  };

  return (
    <div className="bahce-container">
      <h1>Bahçeler</h1>
      <form className="bahce-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="bahce_adi"
          placeholder="Bahçe Adı"
          value={formData.bahce_adi}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="konum"
          placeholder="Konum"
          value={formData.konum}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="alan_buyuklugu"
          placeholder="Alan Büyüklüğü"
          value={formData.alan_buyuklugu}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Güncelle" : "Ekle"}</button>
      </form>
      <div className="bahce-list">
        {bahceler.map((bahce) => (
          <div key={bahce.bahce_id} className="bahce-card">
            <h3>Bahçe Adı: {bahce.bahce_adi}</h3>
            <p>Bahçe ID: {bahce.bahce_id}</p> {/* Bahçe ID eklenmiştir */}
            <p>Konum: {bahce.konum}</p>
            <p>Alan Büyüklüğü: {bahce.alan_buyuklugu} m²</p>
            <button onClick={() => handleEdit(bahce)}>Düzenle</button>
            <button onClick={() => handleDelete(bahce.bahce_id)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bahce;
