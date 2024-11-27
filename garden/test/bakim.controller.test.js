const { create, getAll, update, delete: deleteController } = require('../src/controllers/bakim.controller');

describe('Bakım Controller', () => {
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
      mockReq.body = { bitki_id: 1, bahcivan_id: 2, bakim_turu: 'Sulama' };
      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Tüm alanlar zorunludur!' });
    });

    it('should add a new bakım successfully', () => {
      mockReq.body = {
        bitki_id: 1,
        bahcivan_id: 2,
        aciklama: 'Test Description',
        bakim_turu: 'Sulama',
        bakim_tarihi: '2024-11-01'
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });

      create(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bakım başarıyla eklendi!',
        id: 1
      });
    });

    it('should handle database error when adding bakım', () => {
      mockReq.body = {
        bitki_id: 1,
        bahcivan_id: 2,
        aciklama: 'Test Description',
        bakim_turu: 'Sulama',
        bakim_tarihi: '2024-11-01'
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım eklenirken bir hata oluştu.' });
    });
  });

  describe('getAll', () => {
    it('should retrieve all bakım records successfully', () => {
      const mockData = [
        {
          bakim_id: 1,
          bitki_id: 1,
          bahcivan_id: 2,
          aciklama: 'Sulama',
          bakim_turu: 'Sulama',
          bakim_tarihi: '2024-11-01',
          bitki_adi: 'Bitki 1',
          bahcivan_ad: 'Ahmet',
          bahcivan_soyad: 'Yılmaz'
        }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockData);
      });

      getAll(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bakım kayıtları başarıyla alındı!',
        data: mockData
      });
    });

    it('should handle database error when retrieving bakım records', () => {
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database Error'), null);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Veriler alınırken bir hata oluştu.' });
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
      mockReq.body = {
        bitki_id: 1,
        bahcivan_id: 2,
        aciklama: 'Updated Description',
        bakim_turu: 'Budama',
        bakim_tarihi: '2024-11-15'
      };
    });

    it('should return 400 if required fields are missing', () => {
      mockReq.body = { bitki_id: 1, bahcivan_id: 2 };
      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Tüm alanlar zorunludur!' });
    });

    it('should update bakım record successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım başarıyla güncellendi!' });
    });

    it('should return 404 if bakım record not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım kaydı bulunamadı!' });
    });

    it('should handle database error when updating bakım record', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım güncellenirken bir hata oluştu.' });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockReq.params = { id: 1 };
    });

    it('should delete bakım record successfully', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockDb.query).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım kaydı başarıyla silindi!' });
    });

    it('should return 404 if bakım record not found', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım kaydı bulunamadı!' });
    });

    it('should handle database error when deleting bakım record', () => {
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Bakım silinirken bir hata oluştu.' });
    });
  });
});
