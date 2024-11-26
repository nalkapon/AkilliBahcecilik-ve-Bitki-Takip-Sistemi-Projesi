module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS iklim_takibi (
            iklim_id INT AUTO_INCREMENT PRIMARY KEY,
            bahce_id INT NOT NULL,
            kayit_tarihi DATE NOT NULL,
            sicaklik DECIMAL(5,2) NOT NULL,
            nem DECIMAL(5,2) NOT NULL,
            ruzgar DECIMAL(5,2) NOT NULL,
            FOREIGN KEY (bahce_id) REFERENCES bahce(bahce_id)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating iklim_takibi table:', err);
        } else {
            console.log('İklim Takibi table created successfully.');
        }
    });
};
