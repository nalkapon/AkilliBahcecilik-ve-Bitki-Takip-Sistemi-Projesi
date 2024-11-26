module.exports = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS bahcivan_bahce (
            bahcivan_id INT,
            bahce_id INT,
            gorev_turu VARCHAR(100),
            baslangic_tarihi DATE,
            PRIMARY KEY (bahcivan_id, bahce_id),
            FOREIGN KEY (bahcivan_id) REFERENCES bahcivan(bahcivan_id),
            FOREIGN KEY (bahce_id) REFERENCES bahce(bahce_id)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating bahcivan_bahce table:', err);
        } else {
            console.log('bahcivan_bahce table created successfully.');
        }
    });
};
