// Bakım Ekleme (POST)
exports.create = (req, res) => {
    const { bitki_id, bahcivan_id, aciklama, bakim_turu, bakim_tarihi } = req.body;

    // Doğrulama
    if (!bitki_id || !bahcivan_id || !bakim_turu || !bakim_tarihi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `INSERT INTO bakim (bitki_id, bahcivan_id, aciklama, bakim_turu, bakim_tarihi) VALUES (?, ?, ?, ?, ?)`;
    req.db.query(query, [bitki_id, bahcivan_id, aciklama, bakim_turu, bakim_tarihi], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Bakım eklenirken bir hata oluştu.' });
        }

        res.status(201).send({ message: 'Bakım başarıyla eklendi!', id: result.insertId });
    });
};

// Tüm Bakım Kayıtlarını Listeleme (GET)
exports.getAll = (req, res) => {
    const query = `
        SELECT b.*, bitki.bitki_adi, bahcivan.ad AS bahcivan_ad, bahcivan.soyad AS bahcivan_soyad
        FROM bakim b
        JOIN bitki ON b.bitki_id = bitki.bitki_id
        JOIN bahcivan ON b.bahcivan_id = bahcivan.bahcivan_id
    `;
    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'Bakım kayıtları başarıyla alındı!', data: result });
    });
};

// Bakım Güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { bitki_id, bahcivan_id, aciklama, bakim_turu, bakim_tarihi } = req.body;

    if (!bitki_id || !bahcivan_id || !bakim_turu || !bakim_tarihi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `
        UPDATE bakim
        SET bitki_id = ?, bahcivan_id = ?, aciklama = ?, bakim_turu = ?, bakim_tarihi = ?
        WHERE bakim_id = ?
    `;
    req.db.query(query, [bitki_id, bahcivan_id, aciklama, bakim_turu, bakim_tarihi, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Bakım güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bakım kaydı bulunamadı!' });
        }

        res.status(200).send({ message: 'Bakım başarıyla güncellendi!' });
    });
};

// Bakım Silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM bakim WHERE bakim_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Bakım silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bakım kaydı bulunamadı!' });
        }

        res.status(200).send({ message: 'Bakım kaydı başarıyla silindi!' });
    });
};
