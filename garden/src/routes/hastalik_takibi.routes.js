module.exports = (app) => {
    const hastalikTakibiController = require('../controllers/hastalik_takibi.controller');

    // Hastalık Takibi CRUD işlemleri
    app.get('/api/hastalik_takibi', hastalikTakibiController.getAll); // Tüm hastalık takiplerini listeleme
    app.post('/api/hastalik_takibi', hastalikTakibiController.create); // Yeni hastalık takibi ekleme
    app.put('/api/hastalik_takibi/:id', hastalikTakibiController.update); // Hastalık takibini güncelleme
    app.delete('/api/hastalik_takibi/:id', hastalikTakibiController.delete); // Hastalık takibini silme
};
