module.exports = (app) => {
    const bakimController = require('../controllers/bakim.controller');

    app.get('/api/bakim', bakimController.getAll); // Tüm bakım kayıtlarını listeleme
    app.post('/api/bakim', bakimController.create); // Yeni bakım kaydı ekleme
    app.put('/api/bakim/:id', bakimController.update); // Bakım kaydı güncelleme
    app.delete('/api/bakim/:id', bakimController.delete); // Bakım kaydı silme
};
