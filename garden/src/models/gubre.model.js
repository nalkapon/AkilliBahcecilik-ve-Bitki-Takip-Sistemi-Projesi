module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS gubre (
            gubre_id INT AUTO_INCREMENT PRIMARY KEY,
            gubre_adi VARCHAR(100),
            gubre_aciklamasi TEXT
        );
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating gubre table:', err);
        } else {
            console.log('Gubre table created successfully.');
        }
    });
};
