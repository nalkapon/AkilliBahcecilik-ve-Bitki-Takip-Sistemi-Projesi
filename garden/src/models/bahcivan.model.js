module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS bahcivan (
            bahcivan_id INT AUTO_INCREMENT PRIMARY KEY,
            uzmanlik VARCHAR(100),
            ad VARCHAR(50),
            soyad VARCHAR(50),
            dogum_tarihi DATE,
            eposta VARCHAR(100),
            telefon VARCHAR(20)
        );
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating bahcivan table:', err);
        } else {
            console.log('Bahcivan table created successfully.');
        }
    });
};
