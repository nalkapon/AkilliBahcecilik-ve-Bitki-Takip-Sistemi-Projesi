import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SulamaPlani.css";

const SulamaPlani = () => {
  const [sulamaPlanlari, setSulamaPlanlari] = useState([]);
  const [formData, setFormData] = useState({
    bitki_id: "",
    sulama_tarihi: "",
    su_miktari: "",
    su_kalitesi: "",
    notlar: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Tüm Sulama Planlarını Getir
  const fetchSulamaPlanlari = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/sulama_plani");
      setSulamaPlanlari(response.data.data);
    } catch (error) {
      console.error("Sulama planları alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchSulamaPlanlari();
  }, []);

  // Form Verilerini Yönet
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Yeni Sulama Planı Ekle veya Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3001/api/sulama_plani/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3001/api/sulama_plani", formData);
      }
      setFormData({
        bitki_id: "",
        sulama_tarihi: "",
        su_miktari: "",
        su_kalitesi: "",
        notlar: "",
      });
      fetchSulamaPlanlari();
    } catch (error) {
      console.error("Sulama planı eklenirken/güncellenirken hata oluştu:", error);
    }
  };

  // Sulama Planını Sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/sulama_plani/${id}`);
      fetchSulamaPlanlari();
    } catch (error) {
      console.error("Sulama planı silinirken hata oluştu:", error);
    }
  };

  // Güncelleme için Formu Doldur
  const handleEdit = (plan) => {
    setFormData({
      bitki_id: plan.bitki_id,
      sulama_tarihi: plan.sulama_tarihi,
      su_miktari: plan.su_miktari,
      su_kalitesi: plan.su_kalitesi,
      notlar: plan.notlar,
    });
    setEditingId(plan.sulama_id);
  };

  return (
    <div className="sulama-plani-container">
      <h1>Sulama Planı Yönetimi</h1>
      <form onSubmit={handleSubmit} className="sulama-form">
        <input
          type="number"
          name="bitki_id"
          placeholder="Bitki ID"
          value={formData.bitki_id}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="sulama_tarihi"
          placeholder="Sulama Tarihi"
          value={formData.sulama_tarihi}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.1"
          name="su_miktari"
          placeholder="Su Miktarı (Litre)"
          value={formData.su_miktari}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="su_kalitesi"
          placeholder="Su Kalitesi"
          value={formData.su_kalitesi}
          onChange={handleChange}
          required
        />
        <textarea
          name="notlar"
          placeholder="Notlar"
          value={formData.notlar}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Güncelle" : "Ekle"}</button>
      </form>
      <table className="sulama-table">
        <thead>
          <tr>
            <th>Sulama ID</th>
            <th>Bitki ID</th>
            <th>Sulama Tarihi</th>
            <th>Su Miktarı</th>
            <th>Su Kalitesi</th>
            <th>Notlar</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {sulamaPlanlari.map((plan) => (
            <tr key={plan.sulama_id}>
              <td>{plan.sulama_id}</td>
              <td>{plan.bitki_id}</td>
              <td>{plan.sulama_tarihi}</td>
              <td>{plan.su_miktari} L</td>
              <td>{plan.su_kalitesi}</td>
              <td>{plan.notlar}</td>
              <td>
                <button onClick={() => handleEdit(plan)}>Güncelle</button>
                <button onClick={() => handleDelete(plan.sulama_id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SulamaPlani;
