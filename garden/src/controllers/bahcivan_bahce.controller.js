exports.create = (req, res) => {
    const { bahcivan_id, bahce_id, gorev_turu, baslangic_tarihi } = req.body;

    if (!bahcivan_id || !bahce_id || !gorev_turu || !baslangic_tarihi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `
        INSERT INTO bahcivan_bahce (bahcivan_id, bahce_id, gorev_turu, baslangic_tarihi)
        VALUES (?, ?, ?, ?)
    `;
    req.db.query(query, [bahcivan_id, bahce_id, gorev_turu, baslangic_tarihi], (err, result) => {
        if (err) {
            console.error('Error creating record:', err.message);
            return res.status(500).send({ message: 'Kayıt eklenirken bir hata oluştu.', error: err.message });
        }
        res.status(201).send({ message: 'Kayıt başarıyla eklendi!', data: result });
    });
};

exports.getAll = (req, res) => {
    const query = `SELECT * FROM bahcivan_bahce`;
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching records:', err.message);
            return res.status(500).send({ message: 'Veriler alınırken bir hata oluştu.', error: err.message });
        }
        res.status(200).send({ message: 'Kayıtlar başarıyla alındı!', data: results });
    });
};

exports.update = (req, res) => {
    const { bahcivan_id, bahce_id } = req.params;
    const { gorev_turu, baslangic_tarihi } = req.body;

    if (!gorev_turu || !baslangic_tarihi) {
        return res.status(400).send({ message: 'Tüm alanlar zorunludur!' });
    }

    const query = `
        UPDATE bahcivan_bahce SET gorev_turu = ?, baslangic_tarihi = ?
        WHERE bahcivan_id = ? AND bahce_id = ?
    `;
    req.db.query(query, [gorev_turu, baslangic_tarihi, bahcivan_id, bahce_id], (err, result) => {
        if (err) {
            console.error('Error updating record:', err.message);
            return res.status(500).send({ message: 'Kayıt güncellenirken bir hata oluştu.', error: err.message });
        }
        res.status(200).send({ message: 'Kayıt başarıyla güncellendi!' });
    });
};

exports.delete = (req, res) => {
    const { bahcivan_id, bahce_id } = req.params;

    const query = `
        DELETE FROM bahcivan_bahce WHERE bahcivan_id = ? AND bahce_id = ?
    `;
    req.db.query(query, [bahcivan_id, bahce_id], (err, result) => {
        if (err) {
            console.error('Error deleting record:', err.message);
            return res.status(500).send({ message: 'Kayıt silinirken bir hata oluştu.', error: err.message });
        }
        res.status(200).send({ message: 'Kayıt başarıyla silindi!' });
    });
};
