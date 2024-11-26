const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db_config');
const app = express();
const PORT = 3001;

// Middleware'ler
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Veritabanı bağlantısını istek nesnesine ekleme
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Loglama middleware'i
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method}: ${req.url}`);
    next();
});

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.send('Welcome to Garden Management API!');
});

// Gübrelere ait rotaları içe aktar
require('./routes/gubre.routes')(app);
require('./routes/bahce.routes')(app);
require('./routes/bahcivan.routes')(app);
require('./routes/bitki.routes')(app);
require('./routes/sulama_plani.routes')(app);
require('./routes/gubreleme.routes')(app);
require('./routes/hastalik_takibi.routes')(app);
require('./routes/iklim_takibi.routes')(app);
require('./routes/bakim.routes')(app);
require('./routes/tur_katalogu.routes')(app);
require('./routes/hastalik_katalogu.routes')(app);
require('./routes/bahcivan_bahce.routes')(app);



// 404 Hatası için bir middleware ekleyin
app.use((req, res, next) => {
    res.status(404).send({
        message: 'Aradığınız kaynak bulunamadı!',
    });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
