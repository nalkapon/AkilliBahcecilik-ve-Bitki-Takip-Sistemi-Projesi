// Hastalık Takibi Ekleme (POST)
exports.create = (req, res) => {
    const { bitki_id, hastalik_id, hastalik_tarihi, notlar } = req.body;

    // Verilerin doğru geldiğini kontrol et
    console.log(req.body);

    if (!bitki_id || !hastalik_id || !hastalik_tarihi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    // Sadece gerekli verileri kullanıyoruz, tedavi_yonetimi artık gönderilmiyor
    const query = 'INSERT INTO hastalik_takibi (bitki_id, hastalik_id, hastalik_tarihi, notlar) VALUES (?, ?, ?, ?)';

    req.db.query(query, [bitki_id, hastalik_id, hastalik_tarihi, notlar], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({ message: 'Veri eklenemedi', error: err.message });
        }

        res.status(201).send({ message: 'Hastalık takibi başarıyla eklendi', id: result.insertId });
    });
};

// Tüm Hastalık Takiplerini Listeleme (GET)
exports.getAll = (req, res) => {
    const query = `SELECT ht.*, b.bitki_adi, hk.hastalik_adi
                   FROM hastalik_takibi ht
                   JOIN bitki b ON ht.bitki_id = b.bitki_id
                   JOIN hastalik_katalogu hk ON ht.hastalik_id = hk.hastalik_id`;

    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Listeleme):', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.' });
        }

        res.status(200).send({ message: 'Hastalık takipleri başarıyla alındı!', data: result });
    });
};


// Hastalık Takibi Güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { bitki_id, hastalik_id, hastalik_tarihi, tedavi_yonetimi, notlar } = req.body;

    if (!bitki_id || !hastalik_id || !hastalik_tarihi || !tedavi_yonetimi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `
        UPDATE hastalik_takibi
        SET bitki_id = ?, hastalik_id = ?, hastalik_tarihi = ?, tedavi_yonetimi = ?, notlar = ?
        WHERE hastalik_takibi_id = ?
    `;
    req.db.query(query, [bitki_id, hastalik_id, hastalik_tarihi, tedavi_yonetimi, notlar, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({ message: 'Hastalık takibi güncellenirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Hastalık takibi bulunamadı!' });
        }

        res.status(200).send({ message: 'Hastalık takibi başarıyla güncellendi!' });
    });
};

// Hastalık Takibi Silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM hastalik_takibi WHERE hastalik_takibi_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({ message: 'Hastalık takibi silinirken bir hata oluştu.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Hastalık takibi bulunamadı!' });
        }

        res.status(200).send({ message: 'Hastalık takibi başarıyla silindi!' });
    });
};
