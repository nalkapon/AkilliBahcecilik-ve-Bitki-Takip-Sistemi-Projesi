const { create, getAll, update, delete: deleteController } = require('../src/controllers/gubre.controller');

describe('Gübre Controller Tests', () => {
  let mockReq, mockRes, mockDb;

  beforeEach(() => {
    mockDb = {
      query: jest.fn()
    };

    mockReq = {
      body: {},
      params: {},
      db: mockDb
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  // CREATE Tests
  describe('create', () => {
    it('should return 400 if gubre_adi or gubre_aciklamasi is missing', () => {
      mockReq.body = { gubre_adi: 'Test Gübre' };
      
      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre adı ve açıklaması zorunludur!'
      });
    });

    it('should successfully create a gübre and return created record', () => {
      mockReq.body = { 
        gubre_adi: 'Test Gübre', 
        gubre_aciklamasi: 'Test Açıklama' 
      };

      // Simulate successful insert
      mockDb.query.mockImplementation((query, params, callback) => {
        if (query.includes('INSERT INTO')) {
          callback(null, { insertId: 1 });
        } else if (query.includes('SELECT * FROM')) {
          callback(null, [{ 
            gubre_id: 1, 
            gubre_adi: 'Test Gübre', 
            gubre_aciklamasi: 'Test Açıklama' 
          }]);
        }
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Gübre başarıyla eklendi!',
        data: expect.objectContaining({
          gubre_id: 1,
          gubre_adi: 'Test Gübre',
          gubre_aciklamasi: 'Test Açıklama'
        })
      }));
    });

    it('should handle database insert error', () => {
      mockReq.body = { 
        gubre_adi: 'Test Gübre', 
        gubre_aciklamasi: 'Test Açıklama' 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Gübre eklenirken bir hata oluştu. Lütfen tekrar deneyin.',
      }));
    });
  });

  // GET ALL Tests
  describe('getAll', () => {
    it('should successfully retrieve all gübres', () => {
      const mockGübres = [
        { gubre_id: 1, gubre_adi: 'Gübre 1', gubre_aciklamasi: 'Açıklama 1' },
        { gubre_id: 2, gubre_adi: 'Gübre 2', gubre_aciklamasi: 'Açıklama 2' }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockGübres);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre listesi başarıyla alındı!',
        data: mockGübres
      });
    });

    it('should handle database error in getAll', () => {
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database error'), null);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Veriler alınırken bir hata oluştu.',
      }));
    });
  });

  // UPDATE Tests
  describe('update', () => {
    it('should return 400 if gubre_adi or gubre_aciklamasi is missing', () => {
      mockReq.params = { id: '1' };
      mockReq.body = { gubre_adi: 'Test Gübre' };
      
      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre adı ve açıklaması zorunludur!'
      });
    });

    it('should successfully update a gübre', () => {
      mockReq.params = { id: '1' };
      mockReq.body = { 
        gubre_adi: 'Updated Gübre', 
        gubre_aciklamasi: 'Updated Açıklama' 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre başarıyla güncellendi!'
      });
    });

    it('should return 404 if no gübre found to update', () => {
      mockReq.params = { id: '999' };
      mockReq.body = { 
        gubre_adi: 'Updated Gübre', 
        gubre_aciklamasi: 'Updated Açıklama' 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre bulunamadı!'
      });
    });
  });

  // DELETE Tests
  describe('delete', () => {
    it('should successfully delete a gübre', () => {
      mockReq.params = { id: '1' };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre başarıyla silindi!'
      });
    });

    it('should return 404 if no gübre found to delete', () => {
      mockReq.params = { id: '999' };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübre bulunamadı!'
      });
    });
  });
});