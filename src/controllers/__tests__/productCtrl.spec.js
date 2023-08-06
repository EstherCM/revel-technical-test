const { createProduct, getProducts, updateProduct, deleteProduct } = require('../productCtrl');
const productService = require('../../services/productService');

jest.mock('../../services/productService');

describe('[productCtrl] unit test', () => {
  describe('createProduct', () => {
    it('should create a product', async () => {
      const reqMocked = {
        user: {
          id: 'idMocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.createProduct.mockResolvedValue({
        _id: 'idMocked',
        name: 'nameMocked',
        description: 'descriptionMocked',
        category: 'categoryMocked',
        price: 1,
        createdBy: 'createdByMocked'
      });

      await createProduct(reqMocked, resMocked, nextMocked);

      expect(resMocked.status).toHaveBeenCalledWith(201);
      expect(resMocked.json).toHaveBeenCalledWith({
        data: {
          _id: 'idMocked',
          name: 'nameMocked',
          description: 'descriptionMocked',
          category: 'categoryMocked',
          price: 1,
          createdBy: 'createdByMocked'
        }
      });
    });

    it('should failed when something is wrong', async () => {
      const reqMocked = {
        user: {
          id: 'idMocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.createProduct.mockRejectedValue({ error: 'Error creating product' });

      await createProduct(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toEqual({ error: 'Error creating product' });
    });
  });

  describe('getProducts', () => {
    it('should get products', async () => {
      const reqMocked = {
        query: {
          _id: 'idMocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.getProducts.mockResolvedValue([{
        _id: 'idMocked',
        name: 'nameMocked',
        description: 'descriptionMocked',
        category: 'categoryMocked',
        price: 1,
        createdBy: 'createdByMocked'
      }]);

      await getProducts(reqMocked, resMocked, nextMocked);

      expect(resMocked.status).toHaveBeenCalledWith(200);
      expect(resMocked.json).toHaveBeenCalledWith({
        data: [{
          _id: 'idMocked',
          name: 'nameMocked',
          description: 'descriptionMocked',
          category: 'categoryMocked',
          price: 1,
          createdBy: 'createdByMocked'
        }]
      });
    });

    it('should failed when something is wrong', async () => {
      const reqMocked = {
        query: {
          _id: 'idMocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.getProducts.mockRejectedValue({ error: 'Error getting products' });

      await getProducts(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toEqual({ error: 'Error getting products' });
    });
  });

  describe('updateProduct', () => {
    it('should update data of one product', async () => {
      const reqMocked = {
        params: {
          id: 'idMocked'
        },
        body: {
          name: 'name2Mocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.updateProduct.mockResolvedValue([{
        _id: 'idMocked',
        name: 'name2Mocked',
        description: 'descriptionMocked',
        category: 'categoryMocked',
        price: 1,
        createdBy: 'createdByMocked'
      }]);

      await updateProduct(reqMocked, resMocked, nextMocked);

      expect(resMocked.status).toHaveBeenCalledWith(200);
      expect(resMocked.json).toHaveBeenCalledWith({
        data: [{
          _id: 'idMocked',
          name: 'name2Mocked',
          description: 'descriptionMocked',
          category: 'categoryMocked',
          price: 1,
          createdBy: 'createdByMocked'
        }]
      });
    });

    it('should failed when something is wrong', async () => {
      const reqMocked = {
        params: {
          id: 'idMocked'
        },
        body: {
          name: 'name2Mocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.updateProduct.mockRejectedValue({ error: 'Error updating products' });

      await updateProduct(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toEqual({ error: 'Error updating products' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const reqMocked = {
        params: {
          id: 'idMocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.deleteProduct.mockResolvedValue({ sucess: true });

      await deleteProduct(reqMocked, resMocked, nextMocked);

      expect(resMocked.status).toHaveBeenCalledWith(200);
      expect(resMocked.json).toHaveBeenCalledWith({ sucess: true });
    });

    it('should failed when something is wrong', async () => {
      const reqMocked = {
        params: {
          id: 'idMocked'
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      productService.deleteProduct.mockRejectedValue({ error: 'Error deleting products' });

      await deleteProduct(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toEqual({ error: 'Error deleting products' });
    });
  });
});
