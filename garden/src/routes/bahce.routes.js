module.exports = (app) => {
    const bahceController = require('../controllers/bahce.controller');

    app.get('/api/bahce', bahceController.getAll);
    app.post('/api/bahce', bahceController.create);
    app.put('/api/bahce/:id', bahceController.update);
    app.delete('/api/bahce/:id', bahceController.delete);
};
