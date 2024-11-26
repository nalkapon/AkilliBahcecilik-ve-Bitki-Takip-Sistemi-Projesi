module.exports = (app) => {
    const gubrelemeController = require('../controllers/gubreleme.controller');

    app.get('/api/gubreleme', gubrelemeController.getAll);
    app.post('/api/gubreleme', gubrelemeController.create);
    app.put('/api/gubreleme/:id', gubrelemeController.update);
    app.delete('/api/gubreleme/:id', gubrelemeController.delete);
};
