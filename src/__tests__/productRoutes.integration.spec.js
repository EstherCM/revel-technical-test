const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../app');
const Product = require('../database/models/productModel');

console.info = jest.fn();
console.log = jest.fn();

describe('[product routes] integration test', () => {
  let existingProductId;

  const baseUrl = '/api/v1/products';

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/revel-technical-test');

    const user = {
      name: 'User Integration Test',
      email: 'user@mail.com',
      password: '123456'
    };
  
    await request(app).post('/api/v1/signup').send(user);

    const res = await request(app).post('/api/v1/signin').send({
      email: user.email,
      password: user.password
    });

    authToken = res.body.accessToken;
  });

  afterAll(async () => {
    try {
      await Product.deleteMany({ name: { $regex: /Integration Test/i } });
    } catch (e) {
      console.error(`🔥 Error deleting products ${e}`);
    } finally {
      await mongoose.connection.close();
      server.close();
    };
  });

  describe('POST /api/v1/products', () => {
    it('POST /api/v1/products should create a product', async () => {
      const newProduct = {
        name: 'Product Integration Test',
        description: 'Description Integration Test',
        category: 'Category Integration Test',
        price: 1
      };
      const res = await request(app)
        .post(`${baseUrl}`)
        .send(newProduct)
        .set('Authorization', `Bearer ${authToken}`);

      existingProductId = res.body._id; // To update and delete an existing product

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(newProduct.name);
      expect(res.body.description).toBe(newProduct.description);
      expect(res.body.category).toBe(newProduct.category);
      expect(res.body.price).toBe(newProduct.price);
    });
  });

  describe('GET /api/v1/products', () => {
    it('should return all products', async () => {
      const res = await request(app)
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
    });
  });

  describe('PUT /api/v1/products/:id', () => {
    it('should update a product', async () => {
      const res = await request(app)
        .put(`${baseUrl}/${existingProductId}`)
        .send({
          description: 'Description Integration Test 2',
        })
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.description).toEqual('Description Integration Test 2');
    });
  });

  describe('DELETE /api/v1/products/:id', () => {
    it('should update a product', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/${existingProductId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ success: true });
    });
  });
});