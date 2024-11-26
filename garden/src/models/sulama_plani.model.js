module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS sulama_plani (
            sulama_id INT AUTO_INCREMENT PRIMARY KEY,
            bitki_id INT,
            sulama_tarihi DATE,
            su_miktari DECIMAL(5,2),
            su_kalitesi VARCHAR(100),
            notlar TEXT,
            FOREIGN KEY (bitki_id) REFERENCES bitki(bitki_id)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating sulama_plani table:', err);
        } else {
            console.log('Sulama Planı table created successfully.');
        }
    });
};
