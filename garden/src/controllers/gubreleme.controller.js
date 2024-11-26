exports.create = (req, res) => {
    const { gubreleme_tarihi, gubre_id, miktar, bitki_id } = req.body;

    if (!gubreleme_tarihi || !gubre_id || !miktar || !bitki_id) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `INSERT INTO gubreleme (gubreleme_tarihi, gubre_id, miktar, bitki_id) VALUES (?, ?, ?, ?)`;
    req.db.query(query, [gubreleme_tarihi, gubre_id, miktar, bitki_id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Gübreleme eklenirken bir hata oluştu.' });
        }

        res.status(201).send({ message: 'Gübreleme başarıyla eklendi!', id: result.insertId });
    });
};

exports.getAll = (req, res) => {
    const query = `SELECT * FROM gubreleme`;
    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'Gübreleme listesi başarıyla alındı!', data: result });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { gubreleme_tarihi, gubre_id, miktar, bitki_id } = req.body;

    if (!gubreleme_tarihi || !gubre_id || !miktar || !bitki_id) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `UPDATE gubreleme SET gubreleme_tarihi = ?, gubre_id = ?, miktar = ?, bitki_id = ? WHERE gubreleme_id = ?`;
    req.db.query(query, [gubreleme_tarihi, gubre_id, miktar, bitki_id, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Gübreleme güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Gübreleme bulunamadı!' });
        }

        res.status(200).send({ message: 'Gübreleme başarıyla güncellendi!' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM gubreleme WHERE gubreleme_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Gübreleme silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Gübreleme bulunamadı!' });
        }

        res.status(200).send({ message: 'Gübreleme başarıyla silindi!' });
    });
};
