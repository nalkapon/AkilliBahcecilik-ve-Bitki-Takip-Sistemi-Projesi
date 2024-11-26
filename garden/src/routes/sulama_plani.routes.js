module.exports = (app) => {
    const sulamaController = require('../controllers/sulama_plani.controller');

    app.get('/api/sulama_plani', sulamaController.getAll);
    app.post('/api/sulama_plani', sulamaController.create);
    app.put('/api/sulama_plani/:id', sulamaController.update);
    app.delete('/api/sulama_plani/:id', sulamaController.delete);
};
