exports.create = (req, res) => {
    const { bitki_id, sulama_tarihi, su_miktari, su_kalitesi, notlar } = req.body;

    if (!bitki_id || !sulama_tarihi || !su_miktari || !su_kalitesi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `INSERT INTO sulama_plani (bitki_id, sulama_tarihi, su_miktari, su_kalitesi, notlar) VALUES (?, ?, ?, ?, ?)`;
    req.db.query(query, [bitki_id, sulama_tarihi, su_miktari, su_kalitesi, notlar], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Sulama planı eklenirken bir hata oluştu.' });
        }

        res.status(201).send({ message: 'Sulama planı başarıyla eklendi!', id: result.insertId });
    });
};

exports.getAll = (req, res) => {
    const query = `SELECT * FROM sulama_plani`;
    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'Sulama planı listesi başarıyla alındı!', data: result });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { sulama_tarihi, su_miktari, su_kalitesi, notlar } = req.body;

    if (!sulama_tarihi || !su_miktari || !su_kalitesi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `UPDATE sulama_plani SET sulama_tarihi = ?, su_miktari = ?, su_kalitesi = ?, notlar = ? WHERE sulama_id = ?`;
    req.db.query(query, [sulama_tarihi, su_miktari, su_kalitesi, notlar, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Sulama planı güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Sulama planı bulunamadı!' });
        }

        res.status(200).send({ message: 'Sulama planı başarıyla güncellendi!' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM sulama_plani WHERE sulama_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Sulama planı silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Sulama planı bulunamadı!' });
        }

        res.status(200).send({ message: 'Sulama planı başarıyla silindi!' });
    });
};
