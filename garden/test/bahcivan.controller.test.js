describe('Bahçıvan Controller - Create', () => {
    let mockDb;
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockDb = {
        query: jest.fn()
      };
  
      mockReq = {
        db: mockDb,
        body: {}
      };
  
      mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
    });
  
    it('should return 400 if required fields are missing', () => {
      mockReq.body = {
        ad: 'Ahmet',
        soyad: 'Yılmaz'
        // Missing uzmanlik, dogum_tarihi, eposta, telefon
      };
  
      const { create } = require('../src/controllers/bahcivan.controller');
      create(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });
  
    it('should create a new bahçıvan successfully', () => {
      mockReq.body = {
        uzmanlik: 'Peyzaj',
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        dogum_tarihi: '1990-05-01',
        eposta: 'ahmet.yilmaz@example.com',
        telefon: '555-555-5555'
      };
  
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: 1 });
      });
  
      const { create } = require('../src/controllers/bahcivan.controller');
      create(mockReq, mockRes);
  
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.any(String),
        [
          'Peyzaj',
          'Ahmet',
          'Yılmaz',
          '1990-05-01',
          'ahmet.yilmaz@example.com',
          '555-555-5555'
        ],
        expect.any(Function)
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bahçıvan başarıyla eklendi!',
        id: 1
      });
    });
  
    it('should handle database error when creating bahçıvan', () => {
      mockReq.body = {
        uzmanlik: 'Peyzaj',
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        dogum_tarihi: '1990-05-01',
        eposta: 'ahmet.yilmaz@example.com',
        telefon: '555-555-5555'
      };
  
      mockDb.query.mockImplementation((query, params, callback) => {
        callback(new Error('Database Error'), null);
      });
  
      const { create } = require('../src/controllers/bahcivan.controller');
      create(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Bahçıvan eklenirken bir hata oluştu.'
      });
    });
  });
  