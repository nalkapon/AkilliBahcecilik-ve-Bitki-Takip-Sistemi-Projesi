const { getAll, create, update, delete: deleteMethod } = require('../src/controllers/bitki.controller');

describe('Bitki Controller', () => {
  let mockDb;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDb = {
      query: jest.fn()
    };

    mockReq = {
      db: mockDb,
      body: {},
      params: {}
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  describe('getAll', () => {
    it('should retrieve all plants successfully', () => {
      const mockResults = [{ bitki_id: 1, bitki_adi: 'Test Plant' }];
      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockResults);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM bitki', expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitkiler başarıyla alındı!',
        data: mockResults
      });
    });

    it('should handle database error when retrieving plants', () => {
      const mockError = new Error('Database connection error');
      mockDb.query.mockImplementation((query, callback) => {
        callback(mockError, null);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM bitki', expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Veriler alınırken bir hata oluştu.',
        error: mockError.message
      });
    });
  });

  describe('create', () => {
    beforeEach(() => {
      mockReq.body = {
        sulama_sikligi: 'Haftalık',
        ekim_tarihi: '2023-01-01',
        bitki_adi: 'Test Plant',
        gunes_ihtiyaci: 'Tam güneş',
        tur_id: 1,
        toprak_turu: 'Kumlu',
        bakim_notlari: 'Özenli bakım gerektirir',
        bahce_id: 1
      };
    });

    it('should create a new plant successfully', () => {
      const mockInsertResult = { insertId: 1 };
      const mockNewPlant = { ...mockReq.body, bitki_id: 1 };

      mockDb.query
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockInsertResult);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, [mockNewPlant]);
        });

      create(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalledTimes(2);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitki başarıyla eklendi!',
        data: mockNewPlant
      });
    });

    it('should return error if required fields are missing', () => {
      mockReq.body = {};

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    it('should handle database error during plant creation', () => {
      const mockError = new Error('Insert failed');
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitki eklenirken bir hata oluştu.',
        error: mockError.message
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
      mockReq.body = {
        sulama_sikligi: 'Haftalık',
        ekim_tarihi: '2023-01-01',
        bitki_adi: 'Updated Plant',
        gunes_ihtiyaci: 'Tam güneş',
        tur_id: 1,
        toprak_turu: 'Kumlu',
        bakim_notlari: 'Özenli bakım gerektirir',
        bahce_id: 1
      };
    });

    it('should update a plant successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitki başarıyla güncellendi!'
      });
    });

    it('should return error if required fields are missing', () => {
      mockReq.body = {};

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    it('should return 404 if plant not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitki bulunamadı!'
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
    });

    it('should delete a plant successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteMethod(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitki başarıyla silindi!'
      });
    });

    it('should return 404 if plant not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteMethod(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bitki bulunamadı!'
      });
    });
  });
});