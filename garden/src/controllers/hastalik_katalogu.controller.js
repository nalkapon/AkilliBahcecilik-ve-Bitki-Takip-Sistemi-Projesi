// hastalik_katalogu.controller.js
const hastalikKataloguModel = require('../models/hastalik_katalogu.model');

exports.create = (req, res) => {
    const { hastalik_adi, tedavi_yontemi } = req.body;

    if (!hastalik_adi || !tedavi_yontemi) {
        return res.status(400).send({ message: 'Hastalık adı ve tedavi yöntemi zorunludur!' });
    }

    hastalikKataloguModel.createHastalik(hastalik_adi, tedavi_yontemi, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Hastalık eklenirken bir hata oluştu.', error: err });
        }

        res.status(201).send({ message: 'Hastalık başarıyla eklendi!', data: result });
    });
};

// Hastalık Katalogunu al (GET)
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM hastalik_katalogu';
    
    req.db.query(query, (err, rows) => {
        if (err) {
            console.error('Veritabanı Hatası:', err.message);
            return res.status(500).send({
                message: 'Veriler alınırken bir hata oluştu.',
                error: err.message,
            });
        }
        res.status(200).send({
            message: 'Hastalık Kataloğu başarıyla alındı!',
            data: rows,
        });
    });
};


exports.update = (req, res) => {
    const { id } = req.params;
    const { hastalik_adi, tedavi_yontemi } = req.body;

    if (!hastalik_adi || !tedavi_yontemi) {
        return res.status(400).send({ message: 'Hastalık adı ve tedavi yöntemi zorunludur!' });
    }

    hastalikKataloguModel.updateHastalik(id, hastalik_adi, tedavi_yontemi, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Hastalık güncellenirken bir hata oluştu.', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Hastalık bulunamadı!' });
        }

        res.status(200).send({ message: 'Hastalık başarıyla güncellendi!' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    hastalikKataloguModel.deleteHastalik(id, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Hastalık silinirken bir hata oluştu.', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Hastalık bulunamadı!' });
        }

        res.status(200).send({ message: 'Hastalık başarıyla silindi!' });
    });
};
