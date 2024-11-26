module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS gubreleme (
            gubreleme_id INT AUTO_INCREMENT PRIMARY KEY,
            gubreleme_tarihi DATE,
            gubre_id INT,
            miktar DECIMAL(5,2),
            bitki_id INT,
            FOREIGN KEY (gubre_id) REFERENCES gubre(gubre_id),
            FOREIGN KEY (bitki_id) REFERENCES bitki(bitki_id)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating gubreleme table:', err);
        } else {
            console.log('Gubreleme table created successfully.');
        }
    });
};
