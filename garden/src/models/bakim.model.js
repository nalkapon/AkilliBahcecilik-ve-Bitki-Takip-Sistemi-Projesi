module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS bakim (
            bakim_id INT AUTO_INCREMENT PRIMARY KEY,
            bitki_id INT NOT NULL,
            bahcivan_id INT NOT NULL,
            aciklama TEXT,
            bakim_turu VARCHAR(100) NOT NULL,
            bakim_tarihi DATE NOT NULL,
            FOREIGN KEY (bitki_id) REFERENCES bitki(bitki_id),
            FOREIGN KEY (bahcivan_id) REFERENCES bahcivan(bahcivan_id)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating bakim table:', err);
        } else {
            console.log('Bakım table created successfully.');
        }
    });
};
