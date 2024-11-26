// Gübre Ekleme (POST)
exports.create = (req, res) => {
    const { gubre_adi, gubre_aciklamasi } = req.body;

    // Doğrulama
    if (!gubre_adi || !gubre_aciklamasi) {
        return res.status(400).send({
            message: 'Gübre adı ve açıklaması zorunludur!',
        });
    }

    // Veriyi ekleme sorgusu
    const query = `INSERT INTO gubre (gubre_adi, gubre_aciklamasi) VALUES (?, ?)`;
    req.db.query(query, [gubre_adi, gubre_aciklamasi], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err.message);
            return res.status(500).send({
                message: 'Gübre eklenirken bir hata oluştu. Lütfen tekrar deneyin.',
                error: err.message,
            });
        }

        // Yeni eklenen kaydın ID'sini alın
        const insertedId = result.insertId;

        // Yeni eklenen kaydı geri döndürme sorgusu
        req.db.query(`SELECT * FROM gubre WHERE gubre_id = ?`, [insertedId], (err, rows) => {
            if (err) {
                console.error('Veritabanı Hatası (Veri Getirme):', err.message);
                return res.status(500).send({
                    message: 'Yeni eklenen kaydı döndürürken bir hata oluştu.',
                    error: err.message,
                });
            }

            // Yeni eklenen kaydı döndür
            return res.status(201).send({
                message: 'Gübre başarıyla eklendi!',
                data: rows[0],
            });
        });
    });
};

// Tüm Gübreleri Listeleme (GET)
exports.getAll = (req, res) => {
    const query = `SELECT * FROM gubre`;

    req.db.query(query, (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (GET ALL):', err.message);
            return res.status(500).send({
                message: 'Veriler alınırken bir hata oluştu.',
                error: err.message,
            });
        }

        res.status(200).send({
            message: 'Gübre listesi başarıyla alındı!',
            data: result,
        });
    });
};

// Gübre Güncelleme (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { gubre_adi, gubre_aciklamasi } = req.body;

    if (!gubre_adi || !gubre_aciklamasi) {
        return res.status(400).send({
            message: 'Gübre adı ve açıklaması zorunludur!',
        });
    }

    const query = `UPDATE gubre SET gubre_adi = ?, gubre_aciklamasi = ? WHERE gubre_id = ?`;
    req.db.query(query, [gubre_adi, gubre_aciklamasi, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err.message);
            return res.status(500).send({
                message: 'Gübre güncellenirken bir hata oluştu.',
                error: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Gübre bulunamadı!' });
        }

        res.status(200).send({ message: 'Gübre başarıyla güncellendi!' });
    });
};

// Gübre Silme (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM gubre WHERE gubre_id = ?`;
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err.message);
            return res.status(500).send({
                message: 'Gübre silinirken bir hata oluştu.',
                error: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Gübre bulunamadı!' });
        }

        res.status(200).send({ message: 'Gübre başarıyla silindi!' });
    });
};
