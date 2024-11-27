const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // MySQL kullanıcı adınız
    password: 'alperen', // MySQL şifreniz
    database: 'garden_management', // Veritabanı adı
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
