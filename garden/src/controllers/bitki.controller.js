const Bitki = require('../models/bitki.model');

// Tüm bitkileri listeleme (GET)
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM bitki';

    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Veritabanı Hatası:', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.', error: err.message });
        }
        res.status(200).send({ message: 'Bitkiler başarıyla alındı!', data: results });
    });
};

// Yeni bitki ekleme (POST)
exports.create = (req, res) => {
    const { sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id } = req.body;

    if (!sulama_sikligi || !ekim_tarihi || !bitki_adi || !gunes_ihtiyaci || !tur_id || !toprak_turu || !bahce_id) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = 'INSERT INTO bitki (sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    req.db.query(query, [sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Bitki eklenirken bir hata oluştu.', error: err.message });
        }

        // Yeni eklenen kaydın ID'sini alın
        const insertedId = result.insertId;

        // Yeni eklenen kaydı geri döndürme sorgusu
        req.db.query('SELECT * FROM bitki WHERE bitki_id = ?', [insertedId], (err, rows) => {
            if (err) {
                console.error('Veritabanı Hatası (Veri Getirme):', err.message);
                return res.status(500).send({ message: 'Yeni eklenen kaydı döndürürken bir hata oluştu.', error: err.message });
            }
            res.status(201).send({ message: 'Bitki başarıyla eklendi!', data: rows[0] });
        });
    });
};

// Bitki güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id } = req.body;

    if (!sulama_sikligi || !ekim_tarihi || !bitki_adi || !gunes_ihtiyaci || !tur_id || !toprak_turu || !bahce_id) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = 'UPDATE bitki SET sulama_sikligi = ?, ekim_tarihi = ?, bitki_adi = ?, gunes_ihtiyaci = ?, tur_id = ?, toprak_turu = ?, bakim_notlari = ?, bahce_id = ? WHERE bitki_id = ?';
    
    req.db.query(query, [sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Bitki güncellenirken bir hata oluştu.', error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bitki bulunamadı!' });
        }

        res.status(200).send({ message: 'Bitki başarıyla güncellendi!' });
    });
};

// Bitki silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM bitki WHERE bitki_id = ?';
    
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Bitki silinirken bir hata oluştu.', error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bitki bulunamadı!' });
        }

        res.status(200).send({ message: 'Bitki başarıyla silindi!' });
    });
};
