// routes/bahce_bitki.routes.js

module.exports = (app) => {
    const bahceBitkiController = require('../controllers/bahce_bitki.controller');

    // Tüm bahçe-bitki ilişkilerini listeleme (GET)
    app.get('/api/bahce-bitki', bahceBitkiController.getAll);

    // Yeni bahçe-bitki ilişkisi ekleme (POST)
    app.post('/api/bahce-bitki', bahceBitkiController.create);

    // Bahçe-bitki ilişkisini silme (DELETE)
    app.delete('/api/bahce-bitki/:bahce_id/:bitki_id', bahceBitkiController.delete);
};
