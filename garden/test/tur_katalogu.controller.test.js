const { getAll, create, update, delete: deleteController } = require('../src/controllers/tur_katalogu.controller');
const mysql = require('mysql');

describe('TürKatalogu Controller', () => {
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

  describe('create', () => {
    it('should return 400 if required fields are missing', () => {
      mockReq.body = { tur_adi: 'Test Plant' };
      create(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür adı ve sulama sıklığı zorunludur!' 
      });
    });

    it('should create a new entry successfully', () => {
      mockReq.body = {
        tur_adi: 'Test Plant',
        sulama_sikligi: 'Daily'
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });

      create(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür başarıyla eklendi', 
        id: 1 
      });
    });

    it('should handle database error when creating entry', () => {
      mockReq.body = {
        tur_adi: 'Test Plant',
        sulama_sikligi: 'Daily'
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: 'Database Error',
        message: 'Veri eklenemedi' 
      });
    });
  });

  describe('getAll', () => {
    it('should retrieve all entries successfully', () => {
      const mockPlants = [
        { tur_id: 1, tur_adi: 'Plant 1', sulama_sikligi: 'Weekly' },
        { tur_id: 2, tur_adi: 'Plant 2', sulama_sikligi: 'Bi-weekly' }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockPlants);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür Kataloğu listesi başarıyla alındı!', 
        data: mockPlants 
      });
    });

    it('should handle database error when retrieving entries', () => {
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database Error'), null);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: 'Database Error',
        message: 'Veriler alınırken bir hata oluştu.' 
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
      mockReq.body = {
        tur_adi: 'Updated Plant',
        sulama_sikligi: 'Monthly'
      };
    });

    it('should return 400 if required fields are missing', () => {
      mockReq.body = { tur_adi: 'Test Plant' };
      update(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür adı ve sulama sıklığı zorunludur!' 
      });
    });

    it('should update entry successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür başarıyla güncellendi!' 
      });
    });

    it('should handle database error when updating entry', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: 'Database Error',
        message: 'Tür güncellenirken bir hata oluştu.' 
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
    });

    it('should delete entry successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür başarıyla silindi!' 
      });
    });

    it('should return 404 if entry not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tür bulunamadı!' 
      });
    });

    it('should handle database error when deleting entry', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: 'Database Error',
        message: 'Tür silinirken bir hata oluştu.' 
      });
    });
  });
});
