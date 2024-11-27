const hastalikKataloguController = require('../src/controllers/hastalik_katalogu.controller'); // Adjust path as needed
const hastalikKataloguModel = require('../src/models/hastalik_katalogu.model');

jest.mock('../src/models/hastalik_katalogu.model');

describe('Hastalık Katalogu CRUD Operations', () => {
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
  describe('POST /hastalik_katalogu', () => {
    it('should create a new hastalik successfully', () => {
      const req = {
        body: {
          hastalik_adi: 'Test Disease',
          tedavi_yontemi: 'Test Treatment',
        },
      };

      hastalikKataloguModel.createHastalik.mockImplementation((hastalik_adi, tedavi_yontemi, callback) => {
        callback(null, { insertId: 1 });
      });

      hastalikKataloguController.create(req, mockRes);

      expect(hastalikKataloguModel.createHastalik).toHaveBeenCalledWith('Test Disease', 'Test Treatment', expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık başarıyla eklendi!',
        data: { insertId: 1 },
      });
    });

    it('should return an error if required fields are missing', () => {
      const req = {
        body: {
          hastalik_adi: 'Test Disease',
        },
      };

      hastalikKataloguController.create(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık adı ve tedavi yöntemi zorunludur!',
      });
    });

    it('should return an error if there is a database issue', () => {
      const req = {
        body: {
          hastalik_adi: 'Test Disease',
          tedavi_yontemi: 'Test Treatment',
        },
      };

      hastalikKataloguModel.createHastalik.mockImplementation((hastalik_adi, tedavi_yontemi, callback) => {
        callback(new Error('[Error: Database Error]'), null);
      });

      hastalikKataloguController.create(req, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: expect.any(Error),
        message: 'Hastalık eklenirken bir hata oluştu.',
      });
    });
  });

  // Test for 'Get All' operation (GET)
  describe('GET /hastalik_katalogu', () => {
    it('should retrieve all hastalik katalogu successfully', () => {
      const req = { db: mockDb };

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, [
          { hastalik_id: 1, hastalik_adi: 'Test Disease', tedavi_yontemi: 'Test Treatment' },
        ]);
      });

      hastalikKataloguController.getAll(req, mockRes);

      expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık Kataloğu başarıyla alındı!',
        data: [
          { hastalik_id: 1, hastalik_adi: 'Test Disease', tedavi_yontemi: 'Test Treatment' },
        ],
      });
    });

    it('should return an error if the query fails', () => {
      const req = { db: mockDb };

      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('[Error: Database Error]'), null);
      });

      hastalikKataloguController.getAll(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: '[Error: Database Error]',
        message: 'Veriler alınırken bir hata oluştu.',
      });
    });
  });

  // Test for 'Update' operation (PUT)
  describe('PUT /hastalik_katalogu/:id', () => {
    it('should update an existing hastalik successfully', () => {
      const req = {
        params: { id: 1 },
        body: {
          hastalik_adi: 'Updated Disease',
          tedavi_yontemi: 'Updated Treatment',
        },
      };

      hastalikKataloguModel.updateHastalik.mockImplementation((id, hastalik_adi, tedavi_yontemi, callback) => {
        callback(null, { affectedRows: 1 });
      });

      hastalikKataloguController.update(req, mockRes);

      expect(hastalikKataloguModel.updateHastalik).toHaveBeenCalledWith(1, 'Updated Disease', 'Updated Treatment', expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık başarıyla güncellendi!',
      });
    });

    it('should return an error if required fields are missing', () => {
      const req = {
        params: { id: 1 },
        body: {
          hastalik_adi: 'Updated Disease',
        },
      };

      hastalikKataloguController.update(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık adı ve tedavi yöntemi zorunludur!',
      });
    });

    it('should return an error if update fails', () => {
      const req = {
        params: { id: 1 },
        body: {
          hastalik_adi: 'Updated Disease',
          tedavi_yontemi: 'Updated Treatment',
        },
      };

      hastalikKataloguModel.updateHastalik.mockImplementation((id, hastalik_adi, tedavi_yontemi, callback) => {
        callback(new Error('[Error: Database Error]'), null);
      });

      hastalikKataloguController.update(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: expect.any(Error),
        message: 'Hastalık güncellenirken bir hata oluştu.',
        
      });
    });

    it('should return an error if the disease is not found', () => {
      const req = {
        params: { id: 999 },
        body: {
          hastalik_adi: 'Updated Disease',
          tedavi_yontemi: 'Updated Treatment',
        },
      };

      hastalikKataloguModel.updateHastalik.mockImplementation((id, hastalik_adi, tedavi_yontemi, callback) => {
        callback(null, { affectedRows: 0 });
      });

      hastalikKataloguController.update(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık bulunamadı!',
      });
    });
  });

  // Test for 'Delete' operation (DELETE)
  describe('DELETE /hastalik_katalogu/:id', () => {
    it('should delete an existing hastalik successfully', () => {
      const req = { params: { id: 1 } };

      hastalikKataloguModel.deleteHastalik.mockImplementation((id, callback) => {
        callback(null, { affectedRows: 1 });
      });

      hastalikKataloguController.delete(req, mockRes);

      expect(hastalikKataloguModel.deleteHastalik).toHaveBeenCalledWith(1, expect.any(Function));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık başarıyla silindi!',
      });
    });

    it('should return an error if deletion fails', () => {
      const req = { params: { id: 1 } };

      hastalikKataloguModel.deleteHastalik.mockImplementation((id, callback) => {
        callback(new Error('[Error: Database Error]'), null);
      });

      hastalikKataloguController.delete(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: expect.any(Error),
        message: 'Hastalık silinirken bir hata oluştu.',
        
      });
    });

    it('should return an error if the disease is not found', () => {
      const req = { params: { id: 999 } };

      hastalikKataloguModel.deleteHastalik.mockImplementation((id, callback) => {
        callback(null, { affectedRows: 0 });
      });

      hastalikKataloguController.delete(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Hastalık bulunamadı!',
      });
    });
  });
});
