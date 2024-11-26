import React, { useState, useEffect } from 'react';
import API from '../api';
import './Gubre.css'; 

const Gubre = () => {
    const [gubreler, setGubreler] = useState([]);
    const [gubreAdi, setGubreAdi] = useState('');
    const [gubreAciklamasi, setGubreAciklamasi] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGubreler = () => {
        setLoading(true);
        API.get('/gubre')
            .then((response) => {
                setGubreler(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Veriler alınırken bir hata oluştu:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGubreler();
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        API.post('/gubre', { gubre_adi: gubreAdi, gubre_aciklamasi: gubreAciklamasi })
            .then(() => {
                alert('Gübre başarıyla eklendi!');
                setGubreAdi('');
                setGubreAciklamasi('');
                fetchGubreler();
            })
            .catch((error) => {
                console.error('Gübre eklenirken bir hata oluştu:', error);
                alert('Bir hata oluştu.');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu gübreyi silmek istediğinizden emin misiniz?')) {
            API.delete(`/gubre/${id}`)
                .then(() => {
                    alert('Gübre başarıyla silindi!');
                    fetchGubreler();
                })
                .catch((error) => {
                    console.error('Gübre silinirken bir hata oluştu:', error);
                    alert('Bir hata oluştu.');
                });
        }
    };

    if (loading) {
        return <p>Veriler yükleniyor...</p>;
    }

    return (
        <div className="gubre-container">
            <h1>Gübre Yönetimi</h1>

            <div className="gubre-list">
                <h2>Mevcut Gübreler</h2>
                <ul>
                    {gubreler.map((gubre) => (
                        <li key={gubre.gubre_id}>
                            <span>
                                <strong>{gubre.gubre_adi}</strong>: {gubre.gubre_aciklamasi}
                            </span>
                            <button onClick={() => handleDelete(gubre.gubre_id)}>Sil</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="gubre-form">
                <h2>Yeni Gübre Ekle</h2>
                <form onSubmit={handleAdd}>
                    <label>Gübre Adı:</label>
                    <input
                        type="text"
                        value={gubreAdi}
                        onChange={(e) => setGubreAdi(e.target.value)}
                        required
                    />
                    <label>Gübre Açıklaması:</label>
                    <textarea
                        value={gubreAciklamasi}
                        onChange={(e) => setGubreAciklamasi(e.target.value)}
                        required
                    />
                    <button type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
};

export default Gubre;
