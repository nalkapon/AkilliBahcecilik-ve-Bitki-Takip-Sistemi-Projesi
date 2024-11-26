module.exports = (app) => {
    const gubreController = require('../controllers/gubre.controller');

    // Tüm gübreleri listeleme rotası (GET)
    app.get('/api/gubre', gubreController.getAll);

    // Yeni gübre ekleme rotası (POST)
    app.post('/api/gubre', gubreController.create);

    // Gübre güncelleme rotası (PUT)
    app.put('/api/gubre/:id', gubreController.update);

    // Gübre silme rotası (DELETE)
    app.delete('/api/gubre/:id', gubreController.delete);
};
