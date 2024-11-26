// Bahçıvan Ekleme (POST)
exports.create = (req, res) => {
    const { uzmanlik, ad, soyad, dogum_tarihi, eposta, telefon } = req.body;

    if (!uzmanlik || !ad || !soyad || !dogum_tarihi || !eposta || !telefon) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `INSERT INTO bahcivan (uzmanlik, ad, soyad, dogum_tarihi, eposta, telefon) VALUES (?, ?, ?, ?, ?, ?)`;
    req.db.query(query, [uzmanlik, ad, soyad, dogum_tarihi, eposta, telefon], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Bahçıvan eklenirken bir hata oluştu.' });
        }

        res.status(201).send({ message: 'Bahçıvan başarıyla eklendi!', id: result.insertId });
    });
};

// Tüm Bahçıvanları Listeleme (GET)
exports.getAll = (req, res) => {
    const query = `SELECT * FROM bahcivan`;
    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'Bahçıvan listesi başarıyla alındı!', data: result });
    });
};

// Bahçıvan Güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { uzmanlik, ad, soyad, dogum_tarihi, eposta, telefon } = req.body;

    if (!uzmanlik || !ad || !soyad || !dogum_tarihi || !eposta || !telefon) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `UPDATE bahcivan SET uzmanlik = ?, ad = ?, soyad = ?, dogum_tarihi = ?, eposta = ?, telefon = ? WHERE bahcivan_id = ?`;
    req.db.query(query, [uzmanlik, ad, soyad, dogum_tarihi, eposta, telefon, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Bahçıvan güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bahçıvan bulunamadı!' });
        }

        res.status(200).send({ message: 'Bahçıvan başarıyla güncellendi!' });
    });
};

// Bahçıvan Silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM bahcivan WHERE bahcivan_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Bahçıvan silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Bahçıvan bulunamadı!' });
        }

        res.status(200).send({ message: 'Bahçıvan başarıyla silindi!' });
    });
};
