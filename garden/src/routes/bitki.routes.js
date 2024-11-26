module.exports = (app) => {
    const bitkiController = require('../controllers/bitki.controller');

    // Tüm bitkileri listeleme (GET)
    app.get('/api/bitki', bitkiController.getAll);

    // Yeni bitki ekleme (POST)
    app.post('/api/bitki', bitkiController.create);

    // Bitki güncelleme (PUT)
    app.put('/api/bitki/:id', bitkiController.update);

    // Bitki silme (DELETE)
    app.delete('/api/bitki/:id', bitkiController.delete);
};
