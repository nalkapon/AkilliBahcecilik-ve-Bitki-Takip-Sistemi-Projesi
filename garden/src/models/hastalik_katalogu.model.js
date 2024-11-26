// hastalik_katalogu.model.js
const db = require('../config/db_config'); // Veritabanı bağlantısını içe aktarın

const createHastalik = (hastalikAdi, tedaviYontemi, callback) => {
    const query = 'INSERT INTO hastalik_katalogu (hastalik_adi, tedavi_yontemi) VALUES (?, ?)';
    db.query(query, [hastalikAdi, tedaviYontemi], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Ekleme):', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

const getAllHastaliklar = (callback) => {
    const query = 'SELECT * FROM hastalik_katalogu';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veritabanı Hatası (Getir):', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

const updateHastalik = (id, hastalikAdi, tedaviYontemi, callback) => {
    const query = 'UPDATE hastalik_katalogu SET hastalik_adi = ?, tedavi_yontemi = ? WHERE hastalik_id = ?';
    db.query(query, [hastalikAdi, tedaviYontemi, id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Güncelleme):', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

const deleteHastalik = (id, callback) => {
    const query = 'DELETE FROM hastalik_katalogu WHERE hastalik_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Veritabanı Hatası (Silme):', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    createHastalik,
    getAllHastaliklar,
    updateHastalik,
    deleteHastalik
};
