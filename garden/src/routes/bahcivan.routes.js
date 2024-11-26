module.exports = (app) => {
    const bahcivanController = require('../controllers/bahcivan.controller');

    app.get('/api/bahcivan', bahcivanController.getAll);
    app.post('/api/bahcivan', bahcivanController.create);
    app.put('/api/bahcivan/:id', bahcivanController.update);
    app.delete('/api/bahcivan/:id', bahcivanController.delete);
};
