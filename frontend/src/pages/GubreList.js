import React, { useState, useEffect } from 'react';
import API from '../api';

const GubreList = () => {
    const [gubreler, setGubreler] = useState([]); // Gübreleri tutmak için state
    const [loading, setLoading] = useState(true); // Yüklenme durumunu kontrol etmek için state

    useEffect(() => {
        // Backend'den gübreleri al
        API.get('/gubre')
            .then((response) => {
                setGubreler(response.data.data); // API'den dönen veriyi state'e kaydet
                setLoading(false); // Yüklenme durumu tamamlandı
            })
            .catch((error) => {
                console.error('Gübreleri alırken bir hata oluştu:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Veriler yükleniyor...</p>;
    }

    return (
        <div>
            <h1>Gübre Listesi</h1>
            <ul>
                {gubreler.map((gubre) => (
                    <li key={gubre.gubre_id}>
                        <strong>{gubre.gubre_adi}</strong>: {gubre.gubre_aciklamasi}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GubreList;
