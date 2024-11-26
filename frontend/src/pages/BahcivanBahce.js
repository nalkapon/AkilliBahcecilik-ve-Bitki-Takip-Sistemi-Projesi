import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./BahcivanBahce.css";
const BahcivanBahce = () => {
    const [bahcivanBahce, setBahcivanBahce] = useState([]);
    const [bahcivanId, setBahcivanId] = useState('');
    const [bahceId, setBahceId] = useState('');
    const [gorevTuru, setGorevTuru] = useState('');
    const [baslangicTarihi, setBaslangicTarihi] = useState('');

    useEffect(() => {
        fetchBahcivanBahce();
    }, []);

    const fetchBahcivanBahce = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/bahcivan_bahce');
            setBahcivanBahce(response.data.data);
        } catch (error) {
            console.error('Veriler alınırken bir hata oluştu:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/bahcivan_bahce', {
                bahcivan_id: bahcivanId,
                bahce_id: bahceId,
                gorev_turu: gorevTuru,
                baslangic_tarihi: baslangicTarihi
            });
            fetchBahcivanBahce();
            alert(response.data.message);
        } catch (error) {
            console.error('Gübre eklenirken bir hata oluştu:', error);
        }
    };

    const handleDelete = async (bahcivanId, bahceId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/bahcivan_bahce/${bahcivanId}/${bahceId}`);
            fetchBahcivanBahce();
            alert(response.data.message);
        } catch (error) {
            console.error('Kayıt silinirken bir hata oluştu:', error);
        }
    };

    return (
        <div className="bahcivan-bahce">
            <h2>Bahçivan-Bahçe İlişkisi</h2>

            {/* Yeni Kayıt Eklemek İçin Form */}
            <form onSubmit={handleCreate}>
                <div>
                    <label>Bahçivan ID:</label>
                    <input type="text" value={bahcivanId} onChange={(e) => setBahcivanId(e.target.value)} required />
                </div>
                <div>
                    <label>Bahçe ID:</label>
                    <input type="text" value={bahceId} onChange={(e) => setBahceId(e.target.value)} required />
                </div>
                <div>
                    <label>Görev Türü:</label>
                    <input type="text" value={gorevTuru} onChange={(e) => setGorevTuru(e.target.value)} required />
                </div>
                <div>
                    <label>Başlangıç Tarihi:</label>
                    <input type="date" value={baslangicTarihi} onChange={(e) => setBaslangicTarihi(e.target.value)} required />
                </div>
                <button type="submit">Ekle</button>
            </form>

            {/* Bahçivan-Bahçe İlişkisi Tablosu */}
            <table>
                <thead>
                    <tr>
                        <th>Bahçivan ID</th>
                        <th>Bahçe ID</th>
                        <th>Görev Türü</th>
                        <th>Başlangıç Tarihi</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {bahcivanBahce.map((item) => (
                        <tr key={`${item.bahcivan_id}-${item.bahce_id}`}>
                            <td>{item.bahcivan_id}</td>
                            <td>{item.bahce_id}</td>
                            <td>{item.gorev_turu}</td>
                            <td>{item.baslangic_tarihi}</td>
                            <td>
                                <button onClick={() => handleDelete(item.bahcivan_id, item.bahce_id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BahcivanBahce;
