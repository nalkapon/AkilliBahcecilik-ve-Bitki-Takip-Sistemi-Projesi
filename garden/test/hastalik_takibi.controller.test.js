const createHastalikTakibi = require('../src/controllers/hastalik_takibi.controller'); // Adjust path as needed

describe('Hastalık Takibi CRUD Operations', () => {
  let mockDb;
  let mockRes;

  beforeEach(() => {
    mockDb = {
      query: jest.fn(),
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  // Test for 'Create' operation (POST)
  describe('POST /hastalik_takibi', () => {
    it('should create a new hastalik takibi successfully', () => {
      const req = {
        body: {
          bitki_id: 1,
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          notlar: 'Test Note',
        },
        db: mockDb,
      };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(null, { insertId: 123 });
      });

      createHastalikTakibi.create(req, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.any(String),
        [1, 2, '2024-11-27', 'Test Note'],
        expect.any(Function)
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık takibi başarıyla eklendi',
        id: 123,
      });
    });

    it('should return error if required fields are missing', () => {
      const req = {
        body: {
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          notlar: 'Test Note',
        },
        db: mockDb,
      };

      createHastalikTakibi.create(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Tüm alanlar zorunludur!' });
    });

    it('should return database error if insertion fails', () => {
      const req = {
        body: {
          bitki_id: 1,
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          notlar: 'Test Note',
        },
        db: mockDb,
      };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(new Error('Database Error'), null);
      });

      createHastalikTakibi.create(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Veri eklenemedi', error: 'Database Error' });
    });
  });

  // Test for 'Get All' operation (GET)
  describe('GET /hastalik_takibi', () => {
    it('should retrieve all hastalik takipleri successfully', () => {
      const req = { db: mockDb };

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, [
          { hastalik_takibi_id: 1, bitki_adi: 'Plant A', hastalik_adi: 'Disease A' },
        ]);
      });

      createHastalikTakibi.getAll(req, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık takipleri başarıyla alındı!',
        data: [
          { hastalik_takibi_id: 1, bitki_adi: 'Plant A', hastalik_adi: 'Disease A' },
        ],
      });
    });

    it('should return error if query fails', () => {
      const req = { db: mockDb };

      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database Error'), null);
      });

      createHastalikTakibi.getAll(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Veriler alınırken bir hata oluştu.' });
    });
  });

  // Test for 'Update' operation (PUT)
  describe('PUT /hastalik_takibi/:id', () => {
    it('should update an existing hastalik takibi successfully', () => {
      const req = {
        params: { id: 1 },
        body: {
          bitki_id: 1,
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          tedavi_yonetimi: 'Treatment A',
          notlar: 'Updated Note',
        },
        db: mockDb,
      };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      createHastalikTakibi.update(req, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.any(String),
        [1, 2, '2024-11-27', 'Treatment A', 'Updated Note', 1],
        expect.any(Function)
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Hastalık takibi başarıyla güncellendi!' });
    });

    it('should return error if required fields are missing', () => {
      const req = {
        params: { id: 1 },
        body: {
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          tedavi_yonetimi: 'Treatment A',
        },
        db: mockDb,
      };

      createHastalikTakibi.update(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Tüm alanlar zorunludur!' });
    });

    it('should return error if update fails', () => {
      const req = {
        params: { id: 1 },
        body: {
          bitki_id: 1,
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          tedavi_yonetimi: 'Treatment A',
          notlar: 'Updated Note',
        },
        db: mockDb,
      };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(new Error('Database Error'), null);
      });

      createHastalikTakibi.update(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Hastalık takibi güncellenirken bir hata oluştu.' });
    });

    it('should return error if hastalik takibi not found', () => {
      const req = {
        params: { id: 999 },
        body: {
          bitki_id: 1,
          hastalik_id: 2,
          hastalik_tarihi: '2024-11-27',
          tedavi_yonetimi: 'Treatment A',
          notlar: 'Updated Note',
        },
        db: mockDb,
      };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 0 });
      });

      createHastalikTakibi.update(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Hastalık takibi bulunamadı!' });
    });
  });

  // Test for 'Delete' operation (DELETE)
  describe('DELETE /hastalik_takibi/:id', () => {
    it('should delete an existing hastalik takibi successfully', () => {
      const req = { params: { id: 1 }, db: mockDb };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      createHastalikTakibi.delete(req, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), [1], expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Hastalık takibi başarıyla silindi!' });
    });

    it('should return error if deletion fails', () => {
      const req = { params: { id: 999 }, db: mockDb };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(new Error('Database Error'), null);
      });

      createHastalikTakibi.delete(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Hastalık takibi silinirken bir hata oluştu.' });
    });

    it('should return error if hastalik takibi not found', () => {
      const req = { params: { id: 999 }, db: mockDb };

      mockDb.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 0 });
      });

      createHastalikTakibi.delete(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Hastalık takibi bulunamadı!' });
    });
  });
});
