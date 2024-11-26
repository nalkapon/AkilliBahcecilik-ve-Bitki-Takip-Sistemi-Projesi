module.exports = (app) => {
    const turKataloguController = require('../controllers/tur_katalogu.controller');
    // Tüm türleri listeleme rotası (GET)
    app.get('/api/tur_katalogu', turKataloguController.getAll);

    // Yeni tür ekleme rotası (POST)
    app.post('/api/tur_katalogu', turKataloguController.create);

    // Tür güncelleme rotası (PUT)
    app.put('/api/tur_katalogu/:id', turKataloguController.update);

    // Tür silme rotası (DELETE)
    app.delete('/api/tur_katalogu/:id', turKataloguController.delete);
};
