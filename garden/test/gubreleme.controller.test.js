const { create, getAll, update, delete: deleteController } = require('../src/controllers/gubreleme.controller');

describe('Gubreleme Controller Tests', () => {
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
    it('should return 400 if any required field is missing', () => {
      mockReq.body = { 
        gubreleme_tarihi: '2023-01-01', 
        gubre_id: 1 
      };
      
      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    it('should successfully create a gubreleme', () => {
      mockReq.body = { 
        gubreleme_tarihi: '2023-01-01', 
        gubre_id: 1, 
        miktar: 10, 
        bitki_id: 2 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme başarıyla eklendi!',
        id: 1
      });
    });

    it('should handle database insert error', () => {
      mockReq.body = { 
        gubreleme_tarihi: '2023-01-01', 
        gubre_id: 1, 
        miktar: 10, 
        bitki_id: 2 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database error'), null);
      });

      create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme eklenirken bir hata oluştu.'
      });
    });
  });

  // GET ALL Tests
  describe('getAll', () => {
    it('should successfully retrieve all gubreleme records', () => {
      const mockGubrelemeRecords = [
        { gubreleme_id: 1, gubreleme_tarihi: '2023-01-01', gubre_id: 1, miktar: 10, bitki_id: 2 },
        { gubreleme_id: 2, gubreleme_tarihi: '2023-02-01', gubre_id: 2, miktar: 15, bitki_id: 3 }
      ];

      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockGubrelemeRecords);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme listesi başarıyla alındı!',
        data: mockGubrelemeRecords
      });
    });

    it('should handle database error in getAll', () => {
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database error'), null);
      });

      getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Veriler alınırken bir hata oluştu.'
      });
    });
  });

  // UPDATE Tests
  describe('update', () => {
    it('should return 400 if any required field is missing', () => {
      mockReq.params = { id: '1' };
      mockReq.body = { 
        gubreleme_tarihi: '2023-01-01', 
        gubre_id: 1 
      };
      
      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    it('should successfully update a gubreleme record', () => {
      mockReq.params = { id: '1' };
      mockReq.body = { 
        gubreleme_tarihi: '2023-01-01', 
        gubre_id: 1, 
        miktar: 10, 
        bitki_id: 2 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme başarıyla güncellendi!'
      });
    });

    it('should return 404 if no gubreleme record found to update', () => {
      mockReq.params = { id: '999' };
      mockReq.body = { 
        gubreleme_tarihi: '2023-01-01', 
        gubre_id: 1, 
        miktar: 10, 
        bitki_id: 2 
      };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme bulunamadı!'
      });
    });
  });

  // DELETE Tests
  describe('delete', () => {
    it('should successfully delete a gubreleme record', () => {
      mockReq.params = { id: '1' };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme başarıyla silindi!'
      });
    });

    it('should return 404 if no gubreleme record found to delete', () => {
      mockReq.params = { id: '999' };

      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      deleteController(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Gübreleme bulunamadı!'
      });
    });
  });
});