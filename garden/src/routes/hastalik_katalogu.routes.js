module.exports = (app) => {
    const hastalikKataloguController = require('../controllers/hastalik_katalogu.controller');

    // Hastalık Kataloğu verilerini almak için (GET)
    app.get('/api/hastalik_katalogu', hastalikKataloguController.getAll);

    // Yeni hastalık eklemek için (POST)
    app.post('/api/hastalik_katalogu', hastalikKataloguController.create);

    // Hastalık güncelleme (PUT)
    app.put('/api/hastalik_katalogu/:id', hastalikKataloguController.update);

    // Hastalık silme (DELETE)
    app.delete('/api/hastalik_katalogu/:id', hastalikKataloguController.delete);
};
