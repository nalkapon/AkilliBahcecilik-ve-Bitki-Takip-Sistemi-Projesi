module.exports = (app) => {
    const iklimController = require('../controllers/iklim_takibi.controller');

    app.get('/api/iklim_takibi', iklimController.getAll); // Tüm iklim takibi kayıtlarını listeleme
    app.post('/api/iklim_takibi', iklimController.create); // Yeni iklim takibi ekleme
    app.put('/api/iklim_takibi/:id', iklimController.update); // İklim takibi güncelleme
    app.delete('/api/iklim_takibi/:id', iklimController.delete); // İklim takibi silme
};
