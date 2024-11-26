const mysql = require('mysql');
const connection = require('../config/db_config');

// Bitkilerle ilgili işlemleri yöneten model
const Bitki = {
    getAll: (callback) => {
        connection.query('SELECT * FROM bitki', callback);
    },
    create: (sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id, callback) => {
        connection.query(
            'INSERT INTO bitki (sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id],
            callback
        );
    },
    update: (id, sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id, callback) => {
        connection.query(
            'UPDATE bitki SET sulama_sikligi = ?, ekim_tarihi = ?, bitki_adi = ?, gunes_ihtiyaci = ?, tur_id = ?, toprak_turu = ?, bakim_notlari = ?, bahce_id = ? WHERE bitki_id = ?',
            [sulama_sikligi, ekim_tarihi, bitki_adi, gunes_ihtiyaci, tur_id, toprak_turu, bakim_notlari, bahce_id, id],
            callback
        );
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM bitki WHERE bitki_id = ?', [id], callback);
    }
};

module.exports = Bitki;
