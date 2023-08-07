const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../app');
const Product = require('../database/models/productModel');
const User = require('../database/models/userModel');

console.info = jest.fn();

describe('[routes] integration test /api/v1/', () => {
  let existingProductId;

  const baseUrl = '/api/v1/';

  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/revel-technical-test');
    } catch(e) {
      console.error(`🔥 Error connect mongoose in integration test ${e}`);
    } finally {
      const user = {
        name: 'User Integration Test',
        email: 'user@mail.com',
        password: '123456'
      };

      await request(app).post(`${baseUrl}signup`).send(user);

      const res = await request(app).post(`${baseUrl}signin`).send({
        email: user.email,
        password: user.password
      });

      authToken = res.body.accessToken;
    }
  });

  afterAll(async () => {
    try {
      await User.deleteMany({ name: { $regex: /Integration Test/i } });
      await Product.deleteMany({ name: { $regex: /Integration Test/i } });
    } catch (e) {
      console.error(`🔥 Error deleting items ${e}`);
    } finally {
      await mongoose.connection.close();
      server.close();
    };
  });

  describe('products', () => {
    describe('POST', () => {
      it('should create a product', async () => {
        const newProduct = {
          name: 'Product Integration Test',
          description: 'Description Integration Test',
          category: 'Category Integration Test',
          price: 1
        };
        const res = await request(app)
          .post(`${baseUrl}/products`)
          .send(newProduct)
          .set('Authorization', `Bearer ${authToken}`);

        existingProductId = res.body._id; // To update and delete an existing product

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(newProduct.name);
        expect(res.body.description).toEqual(newProduct.description);
        expect(res.body.category).toEqual(newProduct.category);
        expect(res.body.price).toEqual(newProduct.price);
      });

      it('should return a 400 error if some properties are missing', async () => {
        const newProduct = {
          name: 'Product Integration Test',
          description: 'Description Integration Test',
          category: 'Category Integration Test'
        };
        const res = await request(app)
          .post(`${baseUrl}/products`)
          .send(newProduct)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Bad Request: Some properties are missing');
      });
    });

    describe('GET', () => {
      it('should return all products', async () => {
        const res = await request(app)
        .get(`${baseUrl}/products`)
        .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
      });
    });

    describe('PUT', () => {
      it('should update a product', async () => {
        const res = await request(app)
          .put(`${baseUrl}/products/${existingProductId}`)
          .send({
            description: 'Description Integration Test 2',
          })
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.description).toEqual('Description Integration Test 2');
      });

      it('should return 404 error code if the product does not exist', async () => {
        const res = await request(app)
          .put(`${baseUrl}/products/64cf7275ad64358cf08c10ba`)
          .send({
            description: 'Description Integration Test 2',
          })
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Not Found');
      });

      it('should return 401 error code if the product does not exist', async () => {
        const user = {
          name: 'User2 Integration Test',
          email: 'user2@mail.com',
          password: '123456'
        };
        await request(app).post(`${baseUrl}signup`).send(user);
        const loginRes = await request(app).post(`${baseUrl}signin`).send({
          email: user.email,
          password: user.password
        });
        const { body: { accessToken } } = loginRes;

        const res = await request(app)
          .put(`${baseUrl}/products/${existingProductId}`)
          .send({
            description: 'Description Integration Test 2',
          })
          .set('Authorization', `Bearer ${accessToken}`);

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Unauthorized');
      });
    });

    describe('DELETE', () => {
      it('should update a product', async () => {
        const res = await request(app)
          .delete(`${baseUrl}/products/${existingProductId}`)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ success: true });
      });
    });
  });

  describe('auth', () => {
    describe('POST signup', () => {
      it('should create an user', async () => {
        const newUser = {
          name: 'User Integration Test',
          email: 'usertest@mail.com',
          password: '123456'
        };
        const res = await request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser);

        existingUserId = res.body._id;

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(newUser.name);
        expect(res.body.email).toEqual(newUser.email);
      });

      it('should return 400 error code if some properties are missing', async () => {
        const newUser = {
          name: 'User Integration Test',
          email: 'usertest@mail.com'
        };
        const res = await request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Bad Request: Some properties are missing');
      });

      it('should return 400 error code if email exists', async () => {
        const newUser = {
          name: 'User Integration Test',
          email: 'user@mail.com',
          password: '123456'
        };
        const res = await request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Bad Request: Email is already in use');
      });
    });

    describe('POST signin', () => {
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

      it('should return 404 error code if some properties are missing', async () => {
        const newUser = {
          email: 'user@mail.com',
        };
        const res = await request(app)
        .post(`${baseUrl}/signin`)
        .send(newUser);

        authToken = res.body.accessToken;

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Bad Request: Some properties are missing');
      });
    });

    describe('DELETE users/:id', () => {
      it('should delete an user', async () => {
        const admin = 'admintest@mail.com';
        const loginRes = await request(app).post(`${baseUrl}signin`).send({
          email: admin,
          password: '123456'
        });
        const { body: { accessToken } } = loginRes;

        const res = await request(app)
          .delete(`${baseUrl}/users/${existingUserId}`)
          .set('Authorization', `Bearer ${accessToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ success: true });
      });

      it('should return a 401 error code if it is not a admin', async () => {
        const res = await request(app)
          .delete(`${baseUrl}/users/${existingUserId}`)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Unauthorized');
      });

      it('should return a 401 error code if headers are not provided', async () => {
        const res = await request(app)
          .delete(`${baseUrl}/users/${existingUserId}`);

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Authorization header not provided');
      });

      it('should return a 401 error code if headers are not provided', async () => {
        const res = await request(app)
          .delete(`${baseUrl}/users/${existingUserId}`)
          .set('Authorization', 'TokenValue');

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Bearer not provided');
      });

      it('should return a 401 error code if headers are not provided', async () => {
        const res = await request(app)
          .delete(`${baseUrl}/users/${existingUserId}`)
          .set('Authorization', 'Bearer');

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Token not provided');
      });

      it('should return a 401 error code if headers are not provided', async () => {
        const res = await request(app)
          .delete(`${baseUrl}/users/${existingUserId}`)
          .set('Authorization', 'Bearer ey');

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Unauthorized');
      });
    });
  });
});
