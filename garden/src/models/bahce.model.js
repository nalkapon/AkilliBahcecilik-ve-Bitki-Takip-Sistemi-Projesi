module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS bahce (
            bahce_id INT AUTO_INCREMENT PRIMARY KEY,
            bahce_adi VARCHAR(100),
            konum VARCHAR(100),
            alan_buyuklugu DECIMAL(10,2)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating bahce table:', err);
        } else {
            console.log('Bahce table created successfully.');
        }
    });
};
