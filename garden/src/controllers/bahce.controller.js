// Bahçe Ekleme (POST)
exports.create = (req, res) => {
    const { bahce_adi, konum, alan_buyuklugu, bahcivan_id } = req.body;

    if (!bahce_adi || !konum || !alan_buyuklugu || !bahcivan_id) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `INSERT INTO bahce (bahce_adi, konum, alan_buyuklugu, bahcivan_id) VALUES (?, ?, ?, ?)`;
    req.db.query(query, [bahce_adi, konum, alan_buyuklugu, bahcivan_id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Bahçe eklenirken bir hata oluştu.' });
        }

        res.status(201).send({ message: 'Bahçe başarıyla eklendi!', id: result.insertId });
    });
};

// Tüm Bahçeleri Listeleme (GET)
exports.getAll = (req, res) => {
    const query = `SELECT * FROM bahce`;
    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'Bahçe listesi başarıyla alındı!', data: result });
    });
};

// Bahçe Güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { bahce_adi, konum, alan_buyuklugu, bahcivan_id } = req.body;

    if (!bahce_adi || !konum || !alan_buyuklugu || !bahcivan_id) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `UPDATE bahce SET bahce_adi = ?, konum = ?, alan_buyuklugu = ?, bahcivan_id = ? WHERE bahce_id = ?`;
    req.db.query(query, [bahce_adi, konum, alan_buyuklugu, bahcivan_id, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Bahçe güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bahçe bulunamadı!' });
        }

        res.status(200).send({ message: 'Bahçe başarıyla güncellendi!' });
    });
};

// Bahçe Silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM bahce WHERE bahce_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Bahçe silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bahçe bulunamadı!' });
        }

        res.status(200).send({ message: 'Bahçe başarıyla silindi!' });
    });
};
