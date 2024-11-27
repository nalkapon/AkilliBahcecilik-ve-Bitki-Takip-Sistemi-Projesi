const request = require('supertest');
const { create, getAll, update, delete: deleteController } = require('../src/controllers/bahce.controller');

describe('Bahçe Controller', () => {
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
      mockReq.body = { bahce_adi: 'Test Garden' };
      create(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tüm alanlar zorunludur!' 
      });
    });

    it('should create a new garden successfully', () => {
      mockReq.body = {
        bahce_adi: 'Test Garden',
        konum: 'Test Location',
        alan_buyuklugu: 100
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });

      create(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe başarıyla eklendi!', 
        id: 1 
      });
    });

    it('should handle database error when creating garden', () => {
      mockReq.body = {
        bahce_adi: 'Test Garden',
        konum: 'Test Location',
        alan_buyuklugu: 100
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe eklenirken bir hata oluştu.' 
      });
    });
  });

  describe('getAll', () => {
    it('should retrieve all gardens successfully', () => {
      const mockGardens = [
        { bahce_id: 1, bahce_adi: 'Garden 1', konum: 'Location 1', alan_buyuklugu: 50 },
        { bahce_id: 2, bahce_adi: 'Garden 2', konum: 'Location 2', alan_buyuklugu: 100 }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockGardens);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe listesi başarıyla alındı!', 
        data: mockGardens 
      });
    });

    it('should handle database error when retrieving gardens', () => {
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database Error'), null);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Veriler alınırken bir hata oluştu.' 
      });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
      mockReq.body = {
        bahce_adi: 'Updated Garden',
        konum: 'Updated Location',
        alan_buyuklugu: 200
      };
    });

    it('should return 400 if required fields are missing', () => {
      mockReq.body = { bahce_adi: 'Test Garden' };
      update(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Tüm alanlar zorunludur!' 
      });
    });

    it('should update garden successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe başarıyla güncellendi!' 
      });
    });

    it('should handle database error when updating garden', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe güncellenirken bir hata oluştu.' 
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
    });

    it('should delete garden successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe başarıyla silindi!' 
      });
    });

    it('should return 404 if garden not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe bulunamadı!' 
      });
    });

    it('should handle database error when deleting garden', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: 'Bahçe silinirken bir hata oluştu.' 
      });
    });
  });
});