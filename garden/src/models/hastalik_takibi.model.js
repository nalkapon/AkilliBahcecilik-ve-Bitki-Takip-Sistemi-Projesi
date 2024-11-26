module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS hastalik_takibi (
            hastalik_takibi_id INT AUTO_INCREMENT PRIMARY KEY,
            bitki_id INT NOT NULL,
            hastalik_id INT NOT NULL,
            hastalik_tarihi DATE NOT NULL,
            tedavi_yonetimi TEXT NOT NULL,
            notlar TEXT,
            FOREIGN KEY (bitki_id) REFERENCES bitki(bitki_id),
            FOREIGN KEY (hastalik_id) REFERENCES hastalik_katalogu(hastalik_id)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating hastalik_takibi table:', err);
        } else {
            console.log('Hastalık Takibi table created successfully.');
        }
    });
};
