module.exports = (app) => {
    const bahcivanBahceController = require('../controllers/bahcivan_bahce.controller');

    app.get('/api/bahcivan_bahce', bahcivanBahceController.getAll); // Tüm kayıtlar
    app.post('/api/bahcivan_bahce', bahcivanBahceController.create); // Yeni kayıt ekleme
    app.put('/api/bahcivan_bahce/:bahcivan_id/:bahce_id', bahcivanBahceController.update); // Kayıt güncelleme
    app.delete('/api/bahcivan_bahce/:bahcivan_id/:bahce_id', bahcivanBahceController.delete); // Kayıt silme
};
