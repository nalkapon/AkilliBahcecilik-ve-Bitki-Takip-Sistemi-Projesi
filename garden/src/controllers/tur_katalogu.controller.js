// Tür Kataloğu verilerini al (GET)
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM tur_katalogu';
    
    req.db.query(query, (err, rows) => {
        if (err) {
            console.error('Veritabanı Hatası:', err.message);
            return res.status(500).send({
                message: 'Veriler alınırken bir hata oluştu.',
                error: err.message,
            });
        }
        res.status(200).send({
            message: 'Tür Kataloğu listesi başarıyla alındı!',
            data: rows,
        });
    });
};

// Tür Kataloğu verisi ekle (POST)
exports.create = (req, res) => {
    const { tur_adi, sulama_sikligi } = req.body;

    if (!tur_adi || !sulama_sikligi) {
        return res.status(400).send({ message: 'Tür adı ve sulama sıklığı zorunludur!' });
    }

    const query = 'INSERT INTO tur_katalogu (tur_adi, sulama_sikligi) VALUES (?, ?)';
    req.db.query(query, [tur_adi, sulama_sikligi], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Tür eklenirken bir hata oluştu.', error: err.message });
        }
        res.status(201).send({ message: 'Tür başarıyla eklendi!' });
    });
};

// Tür Kataloğu güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { tur_adi, sulama_sikligi } = req.body;

    if (!tur_adi || !sulama_sikligi) {
        return res.status(400).send({
            message: 'Tür adı ve sulama sıklığı zorunludur!',
        });
    }

    const query = 'UPDATE tur_katalogu SET tur_adi = ?, sulama_sikligi = ? WHERE tur_id = ?';
    req.db.query(query, [tur_adi, sulama_sikligi, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({
                message: 'Tür güncellenirken bir hata oluştu.',
                error: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Tür bulunamadı!' });
        }

        res.status(200).send({ message: 'Tür başarıyla güncellendi!' });
    });
};

// Tür Kataloğu silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tur_katalogu WHERE tur_id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({
                message: 'Tür silinirken bir hata oluştu.',
                error: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Tür bulunamadı!' });
        }

        res.status(200).send({ message: 'Tür başarıyla silindi!' });
    });
};
