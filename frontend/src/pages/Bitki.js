import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bitki.css";

const Bitki = () => {
    const [bitkiler, setBitkiler] = useState([]);
    const [formData, setFormData] = useState({
        bitki_adi: "",
        tur_id: "",
        sulama_sikligi: "",
        ekim_tarihi: "",
        gunes_ihtiyaci: "",
        toprak_turu: "",
        bakim_notlari: "",
        bahce_id: "",
    });

    const [editingId, setEditingId] = useState(null);

    // Bitkileri Yükleme
    useEffect(() => {
        fetchBitkiler();
    }, []);

    const fetchBitkiler = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/bitki");
            setBitkiler(response.data.data);
        } catch (error) {
            console.error("Bitkiler alınamadı:", error);
        }
    };

    // Bitki Ekleme/Güncelleme
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:3001/api/bitki/${editingId}`, formData);
                alert("Bitki başarıyla güncellendi!");
            } else {
                await axios.post("http://localhost:3001/api/bitki", formData);
                alert("Bitki başarıyla eklendi!");
            }
            setFormData({
                bitki_adi: "",
                tur_id: "",
                sulama_sikligi: "",
                ekim_tarihi: "",
                gunes_ihtiyaci: "",
                toprak_turu: "",
                bakim_notlari: "",
                bahce_id: "",
            });
            setEditingId(null);
            fetchBitkiler();
        } catch (error) {
            console.error("Bitki kaydedilemedi:", error);
        }
    };

    // Bitki Silme
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/bitki/${id}`);
            alert("Bitki başarıyla silindi!");
            fetchBitkiler();
        } catch (error) {
            console.error("Bitki silinemedi:", error);
        }
    };

    // Düzenleme için Bitki Bilgilerini Forma Yükleme
    const handleEdit = (bitki) => {
        setEditingId(bitki.bitki_id);
        setFormData({
            bitki_adi: bitki.bitki_adi,
            tur_id: bitki.tur_id,
            sulama_sikligi: bitki.sulama_sikligi,
            ekim_tarihi: bitki.ekim_tarihi,
            gunes_ihtiyaci: bitki.gunes_ihtiyaci,
            toprak_turu: bitki.toprak_turu,
            bakim_notlari: bitki.bakim_notlari,
            bahce_id: bitki.bahce_id,
        });
    };

    return (
        <div className="bitki-container">
            <h1>Bitkiler</h1>
            <form className="bitki-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Bitki Adı"
                    value={formData.bitki_adi}
                    onChange={(e) => setFormData({ ...formData, bitki_adi: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Tür ID"
                    value={formData.tur_id}
                    onChange={(e) => setFormData({ ...formData, tur_id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Sulama Sıklığı"
                    value={formData.sulama_sikligi}
                    onChange={(e) => setFormData({ ...formData, sulama_sikligi: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Ekim Tarihi"
                    value={formData.ekim_tarihi}
                    onChange={(e) => setFormData({ ...formData, ekim_tarihi: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Güneş İhtiyacı"
                    value={formData.gunes_ihtiyaci}
                    onChange={(e) => setFormData({ ...formData, gunes_ihtiyaci: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Toprak Türü"
                    value={formData.toprak_turu}
                    onChange={(e) => setFormData({ ...formData, toprak_turu: e.target.value })}
                />
                <textarea
                    placeholder="Bakım Notları"
                    value={formData.bakim_notlari}
                    onChange={(e) => setFormData({ ...formData, bakim_notlari: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Bahçe ID"
                    value={formData.bahce_id}
                    onChange={(e) => setFormData({ ...formData, bahce_id: e.target.value })}
                />
                <button type="submit">{editingId ? "Güncelle" : "Ekle"}</button>
            </form>

            <div className="bitki-list">
                {bitkiler.map((bitki) => (
                    <div className="bitki-card" key={bitki.bitki_id}>
                        <h3>{bitki.bitki_adi}</h3>
                        <p>Bitki ID: {bitki.bitki_id}</p> {/* Bitki ID'si eklenmiştir */}
                        <p>Tür ID: {bitki.tur_id}</p>
                        <p>Sulama Sıklığı: {bitki.sulama_sikligi}</p>
                        <p>Ekim Tarihi: {bitki.ekim_tarihi}</p>
                        <p>Güneş İhtiyacı: {bitki.gunes_ihtiyaci}</p>
                        <p>Toprak Türü: {bitki.toprak_turu}</p>
                        <p>Bakım Notları: {bitki.bakim_notlari}</p>
                        <p>Bahçe ID: {bitki.bahce_id}</p>
                        <button onClick={() => handleDelete(bitki.bitki_id)}>Sil</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bitki;
