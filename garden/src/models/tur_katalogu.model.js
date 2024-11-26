const mysql = require('mysql');
const connection = require('../config/db_config');

const TurKatalogu = {
    getAll: (callback) => {
        connection.query('SELECT * FROM tur_katalogu', callback);
    },
    create: (tur_adi, sulama_sikligi, callback) => {
        connection.query(
            'INSERT INTO tur_katalogu (tur_adi, sulama_sikligi) VALUES (?, ?)',
            [tur_adi, sulama_sikligi],
            callback
        );
    },
    update: (id, tur_adi, sulama_sikligi, callback) => {
        connection.query(
            'UPDATE tur_katalogu SET tur_adi = ?, sulama_sikligi = ? WHERE tur_id = ?',
            [tur_adi, sulama_sikligi, id],
            callback
        );
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM tur_katalogu WHERE tur_id = ?', [id], callback);
    }
};

module.exports = TurKatalogu;
