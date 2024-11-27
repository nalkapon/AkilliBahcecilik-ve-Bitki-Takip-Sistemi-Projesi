const sulamaPlanController = require('../src/controllers/sulama_plani.controller');

describe('Sulama Planı Controller', () => {
  let req;
  let res;
  
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      db: {
        query: jest.fn()
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const validPlan = {
      bitki_id: 1,
      sulama_tarihi: '2024-03-27',
      su_miktari: 500,
      su_kalitesi: 'İyi',
      notlar: 'Test notları'
    };

    test('tüm zorunlu alanlar olmadan 400 hatası döner', () => {
      sulamaPlanController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 
        message: 'Tüm alanlar zorunludur!' 
      });
    });

    test('geçerli veri ile başarılı kayıt yapar', () => {
      req.body = validPlan;
      const mockInsertId = 1;
      
      req.db.query.mockImplementation((query, params, callback) => {
        callback(null, { insertId: mockInsertId });
      });

      sulamaPlanController.create(req, res);

      expect(req.db.query).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı başarıyla eklendi!',
        id: mockInsertId
      });
    });

    test('veritabanı hatası durumunda 500 döner', () => {
      req.body = validPlan;
      
      req.db.query.mockImplementation((query, params, callback) => {
        callback(new Error('DB Error'), null);
      });

      sulamaPlanController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı eklenirken bir hata oluştu.'
      });
    });
  });

  describe('getAll', () => {
    test('başarılı listeleme yapar', () => {
      const mockData = [
        { sulama_id: 1, bitki_id: 1, sulama_tarihi: '2024-03-27' }
      ];

      req.db.query.mockImplementation((query, callback) => {
        callback(null, mockData);
      });

      sulamaPlanController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı listesi başarıyla alındı!',
        data: mockData
      });
    });

    test('veritabanı hatası durumunda 500 döner', () => {
      req.db.query.mockImplementation((query, callback) => {
        callback(new Error('DB Error'), null);
      });

      sulamaPlanController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Veriler alınırken bir hata oluştu.'
      });
    });
  });

  describe('update', () => {
    const validUpdateData = {
      sulama_tarihi: '2024-03-27',
      su_miktari: 600,
      su_kalitesi: 'Çok İyi',
      notlar: 'Güncellenmiş notlar'
    };

    test('geçersiz veri ile 400 hatası döner', () => {
      req.params = { id: 1 };
      req.body = { sulama_tarihi: '2024-03-27' }; // eksik veri

      sulamaPlanController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Tüm alanlar zorunludur!'
      });
    });

    test('başarılı güncelleme yapar', () => {
      req.params = { id: 1 };
      req.body = validUpdateData;

      req.db.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      sulamaPlanController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı başarıyla güncellendi!'
      });
    });

    test('bulunamayan kayıt için 404 döner', () => {
      req.params = { id: 999 };
      req.body = validUpdateData;

      req.db.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      sulamaPlanController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı bulunamadı!'
      });
    });
  });

  describe('delete', () => {
    test('başarılı silme işlemi yapar', () => {
      req.params = { id: 1 };

      req.db.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      sulamaPlanController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı başarıyla silindi!'
      });
    });

    test('bulunamayan kayıt için 404 döner', () => {
      req.params = { id: 999 };

      req.db.query.mockImplementation((query, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      sulamaPlanController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı bulunamadı!'
      });
    });

    test('veritabanı hatası durumunda 500 döner', () => {
      req.params = { id: 1 };

      req.db.query.mockImplementation((query, params, callback) => {
        callback(new Error('DB Error'), null);
      });

      sulamaPlanController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Sulama planı silinirken bir hata oluştu.'
      });
    });
  });
});
