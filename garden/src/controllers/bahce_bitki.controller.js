const BahceBitki = require('../models/bahce_bitki');

// Bahçe ve Bitki ilişkilerini listeleme
exports.getAll = (req, res) => {
  BahceBitki.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Veri alınırken bir hata oluştu', error: err });
    }
    res.status(200).json({ data: rows });
  });
};

// Yeni bahçe ve bitki ilişkisi ekleme
exports.create = (req, res) => {
  const { bahce_id, bitki_id, ekim_tarihi, bakım_notları } = req.body;
  if (!bahce_id || !bitki_id || !ekim_tarihi) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur!' });
  }

  BahceBitki.create(bahce_id, bitki_id, ekim_tarihi, bakım_notları, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Veri eklenirken bir hata oluştu.', error: err });
    }
    res.status(201).json({ message: 'Veri başarıyla eklendi', id: result.insertId });
  });
};

// Bahçe ve Bitki ilişkisini güncelleme
exports.update = (req, res) => {
  const { bahce_id, bitki_id } = req.params;
  const { ekim_tarihi, bakım_notları } = req.body;

  if (!ekim_tarihi || !bakım_notları) {
    return res.status(400).json({ message: 'Ekim tarihi ve bakım notları zorunludur!' });
  }

  BahceBitki.update(bahce_id, bitki_id, ekim_tarihi, bakım_notları, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Veri güncellenirken bir hata oluştu.', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Veri bulunamadı' });
    }

    res.status(200).json({ message: 'Veri başarıyla güncellendi' });
  });
};

// Bahçe ve Bitki ilişkisini silme
exports.delete = (req, res) => {
  const { bahce_id, bitki_id } = req.params;

  BahceBitki.delete(bahce_id, bitki_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Veri silinirken bir hata oluştu.', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Veri bulunamadı' });
    }

    res.status(200).json({ message: 'Veri başarıyla silindi' });
  });
};
