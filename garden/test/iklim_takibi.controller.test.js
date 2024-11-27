const request = require('supertest');
const { create, getAll, update, delete: deleteController } = require('../src/controllers/iklim_takibi.controller');

describe('İklim Takibi Controller', () => {
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
      mockReq.body = { bahce_id: 1, kayit_tarihi: '2024-11-27' };
      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    it('should create climate record successfully', () => {
      mockReq.body = {
        bahce_id: 1,
        kayit_tarihi: '2024-11-27',
        sicaklik: 25,
        nem: 60,
        ruzgar: 15
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });

      create(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi başarıyla eklendi!',
        id: 1
      });
    });

    it('should handle database error when creating climate record', () => {
      mockReq.body = {
        bahce_id: 1,
        kayit_tarihi: '2024-11-27',
        sicaklik: 25,
        nem: 60,
        ruzgar: 15
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi eklenirken bir hata oluştu.'
      });
    });
  });

  describe('getAll', () => {
    it('should retrieve all climate records successfully', () => {
      const mockClimateData = [
        { iklim_id: 1, bahce_id: 1, kayit_tarihi: '2024-11-27', sicaklik: 25, nem: 60, ruzgar: 15, bahce_adi: 'Garden 1' },
        { iklim_id: 2, bahce_id: 2, kayit_tarihi: '2024-11-27', sicaklik: 22, nem: 55, ruzgar: 10, bahce_adi: 'Garden 2' }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockClimateData);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi başarıyla alındı!',
        data: mockClimateData
      });
    });

    it('should handle database error when retrieving climate records', () => {
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
        bahce_id: 1,
        kayit_tarihi: '2024-11-27',
        sicaklik: 25,
        nem: 60,
        ruzgar: 15
      };
    });

    it('should return 400 if required fields are missing', () => {
      mockReq.body = { bahce_id: 1, kayit_tarihi: '2024-11-27' };
      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    it('should update climate record successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi başarıyla güncellendi!'
      });
    });

    it('should handle database error when updating climate record', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi güncellenirken bir hata oluştu.'
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
    });

    it('should delete climate record successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi başarıyla silindi!'
      });
    });

    it('should return 404 if climate record not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi bulunamadı!'
      });
    });

    it('should handle database error when deleting climate record', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'İklim takibi silinirken bir hata oluştu.'
      });
    });
  });
});
