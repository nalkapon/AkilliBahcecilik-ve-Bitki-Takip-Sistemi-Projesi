const request = require('supertest');
const { create, getAll, update, delete: deleteController } = require('../src/controllers/bahcivan_bahce.controller');

describe('Bahçıvan Bahçe Controller', () => {
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
      mockReq.body = { bahcivan_id: 1, bahce_id: 2, gorev_turu: 'Watering' };
      create(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tüm alanlar zorunludur!' 
      });
    });

    it('should create a new record successfully', () => {
      mockReq.body = {
        bahcivan_id: 1,
        bahce_id: 2,
        gorev_turu: 'Watering',
        baslangic_tarihi: '2024-11-27'
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });

      create(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıt başarıyla eklendi!',
        data: { insertId: 1 }
      });
    });

    it('should handle database error when creating record', () => {
      mockReq.body = {
        bahcivan_id: 1,
        bahce_id: 2,
        gorev_turu: 'Watering',
        baslangic_tarihi: '2024-11-27'
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıt eklenirken bir hata oluştu.', 
        error: 'Database Error' 
      });
    });
  });

  describe('getAll', () => {
    it('should retrieve all records successfully', () => {
      const mockRecords = [
        { bahcivan_id: 1, bahce_id: 1, gorev_turu: 'Watering', baslangic_tarihi: '2024-11-27' },
        { bahcivan_id: 2, bahce_id: 2, gorev_turu: 'Pruning', baslangic_tarihi: '2024-11-26' }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockRecords);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıtlar başarıyla alındı!',
        data: mockRecords
      });
    });

    it('should handle database error when retrieving records', () => {
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database Error'), null);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Veriler alınırken bir hata oluştu.', 
        error: 'Database Error' 
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockReq.params = { bahcivan_id: 1, bahce_id: 1 };
      mockReq.body = {
        gorev_turu: 'Watering',
        baslangic_tarihi: '2024-11-28'
      };
    });

    it('should return 400 if required fields are missing', () => {
      mockReq.body = { gorev_turu: 'Watering' };
      update(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tüm alanlar zorunludur!' 
      });
    });

    it('should update the record successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıt başarıyla güncellendi!' 
      });
    });

    it('should handle database error when updating record', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıt güncellenirken bir hata oluştu.', 
        error: 'Database Error' 
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockReq.params = { bahcivan_id: 1, bahce_id: 1 };
    });

    it('should delete the record successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıt başarıyla silindi!' 
      });
    });

    it('should handle database error when deleting record', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Kayıt silinirken bir hata oluştu.', 
        error: 'Database Error' 
      });
    });
  });
});
