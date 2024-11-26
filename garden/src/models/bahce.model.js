module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS bahce (
            bahce_id INT AUTO_INCREMENT PRIMARY KEY,
            bahce_adi VARCHAR(100),
            konum VARCHAR(100),
            alan_buyuklugu DECIMAL(10,2),
            bahcivan_id INT,
            FOREIGN KEY (bahcivan_id) REFERENCES bahcivan(bahcivan_id)
        );
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating bahce table:', err);
        } else {
            console.log('Bahce table created successfully.');
        }
    });
};
