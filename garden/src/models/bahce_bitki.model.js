const connection = require('../config/db_config'); // DB bağlantınızı doğru bir şekilde import edin

const BahceBitki = {
  // Bahçe ve Bitki ilişkisini listeleme
  getAll: (callback) => {
    connection.query('SELECT * FROM bahce_bitki', callback);
  },

  // Yeni bir bahçe bitki ilişkisi ekleme
  create: (bahce_id, bitki_id, ekim_tarihi, bakım_notları, callback) => {
    const query = `INSERT INTO bahce_bitki (bahce_id, bitki_id, ekim_tarihi, bakım_notları) VALUES (?, ?, ?, ?)`;
    connection.query(query, [bahce_id, bitki_id, ekim_tarihi, bakım_notları], callback);
  },

  // Bahçe bitki ilişkisini güncelleme
  update: (bahce_id, bitki_id, ekim_tarihi, bakım_notları, callback) => {
    const query = `UPDATE bahce_bitki SET ekim_tarihi = ?, bakım_notları = ? WHERE bahce_id = ? AND bitki_id = ?`;
    connection.query(query, [ekim_tarihi, bakım_notları, bahce_id, bitki_id], callback);
  },

  // Bahçe bitki ilişkisini silme
  delete: (bahce_id, bitki_id, callback) => {
    const query = `DELETE FROM bahce_bitki WHERE bahce_id = ? AND bitki_id = ?`;
    connection.query(query, [bahce_id, bitki_id], callback);
  }
};

module.exports = BahceBitki;
