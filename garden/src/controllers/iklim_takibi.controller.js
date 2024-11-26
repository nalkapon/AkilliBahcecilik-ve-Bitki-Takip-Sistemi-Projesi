// İklim Takibi Ekleme (POST)
exports.create = (req, res) => {
    const { bahce_id, kayit_tarihi, sicaklik, nem, ruzgar } = req.body;

    // Doğrulama
    if (!bahce_id || !kayit_tarihi || !sicaklik || !nem || !ruzgar) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `INSERT INTO iklim_takibi (bahce_id, kayit_tarihi, sicaklik, nem, ruzgar) VALUES (?, ?, ?, ?, ?)`;
    req.db.query(query, [bahce_id, kayit_tarihi, sicaklik, nem, ruzgar], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'İklim takibi eklenirken bir hata oluştu.' });
        }

        res.status(201).send({ message: 'İklim takibi başarıyla eklendi!', id: result.insertId });
    });
};

// Tüm İklim Takiplerini Listeleme (GET)
exports.getAll = (req, res) => {
    const query = `
        SELECT it.*, b.bahce_adi 
        FROM iklim_takibi it
        JOIN bahce b ON it.bahce_id = b.bahce_id
    `;
    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'İklim takibi başarıyla alındı!', data: result });
    });
};

// İklim Takibi Güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { bahce_id, kayit_tarihi, sicaklik, nem, ruzgar } = req.body;

    if (!bahce_id || !kayit_tarihi || !sicaklik || !nem || !ruzgar) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `
        UPDATE iklim_takibi
        SET bahce_id = ?, kayit_tarihi = ?, sicaklik = ?, nem = ?, ruzgar = ?
        WHERE iklim_id = ?
    `;
    req.db.query(query, [bahce_id, kayit_tarihi, sicaklik, nem, ruzgar, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'İklim takibi güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'İklim takibi bulunamadı!' });
        }

        res.status(200).send({ message: 'İklim takibi başarıyla güncellendi!' });
    });
};

// İklim Takibi Silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM iklim_takibi WHERE iklim_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'İklim takibi silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'İklim takibi bulunamadı!' });
        }

        res.status(200).send({ message: 'İklim takibi başarıyla silindi!' });
    });
};
