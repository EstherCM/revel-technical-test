const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../app');
const User = require('../database/models/userModel');

console.info = jest.fn();
console.log = jest.fn();

describe('[auth routes] integration test', () => {
  let existingUserId;
  let authToken;

  const baseUrl = '/api/v1/';

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/revel-technical-test');
  });

  afterAll(async () => {
    try {
      await User.deleteMany({ name: { $regex: /User Integration Test/i } });
    } catch (e) {
      console.error(`🔥 Error deleting users ${e}`);
    } finally {
      await mongoose.connection.close();
      server.close();
    };
  });

  describe('POST /api/v1/signup', () => {
    it('POST /api/v1/signup should create an user', async () => {
      const newUser = {
        name: 'User Integration Test',
        email: 'user@mail.com',
        password: '123456'
      };
      const res = await request(app)
        .post(`${baseUrl}/signup`)
        .send(newUser);

      existingUserId = res.body._id;

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
    });
  });

  describe('GET /api/v1/signin', () => {
    it('should log in an user', async () => {
      const newUser = {
        email: 'user@mail.com',
        password: '123456'
      };
      const res = await request(app)
      .post(`${baseUrl}/signin`)
      .send(newUser);

      authToken = res.body.accessToken;

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.accessToken).toBeDefined();
    });
  });

  describe.skip('DELETE /api/v1/users/:id', () => {
    it('should delete an user', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${existingUserId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ success: true });
    });
  });
});
