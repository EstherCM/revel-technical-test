const { createProduct, getProducts, updateProduct, deleteProduct } = require('../productCtrl');
const productService = require('../../services/productService');

jest.mock('../../services/productService');

describe('[productCtrl] unit test', () => {
  describe('createProduct', () => {
    it('should create a product', async () => {
      const mockedReq = {
        user: {
          id: 'mockedId'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.createProduct.mockResolvedValue({
        _id: 'mockedId',
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1,
        createdBy: 'mockedCreatedBy'
      });

      await createProduct(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(201);
      expect(mockedRes.json).toHaveBeenCalledWith({
        data: {
          _id: 'mockedId',
          name: 'mockedName',
          description: 'mockedDescription',
          category: 'mockedCategory',
          price: 1,
          createdBy: 'mockedCreatedBy'
        }
      });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        user: {
          id: 'mockedId'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.createProduct.mockRejectedValue({ error: 'Error creating product' });

      await createProduct(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error creating product' });
    });
  });

  describe('getProducts', () => {
    it('should get products', async () => {
      const mockedReq = {
        query: {
          _id: 'mockedId'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.getProducts.mockResolvedValue([{
        _id: 'mockedId',
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1,
        createdBy: 'mockedCreatedBy'
      }]);

      await getProducts(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith({
        data: [{
          _id: 'mockedId',
          name: 'mockedName',
          description: 'mockedDescription',
          category: 'mockedCategory',
          price: 1,
          createdBy: 'mockedCreatedBy'
        }]
      });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        query: {
          _id: 'mockedId'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.getProducts.mockRejectedValue({ error: 'Error getting products' });

      await getProducts(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error getting products' });
    });
  });

  describe('updateProduct', () => {
    it('should update data of one product', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId'
        },
        body: {
          name: 'mockedName2'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.updateProduct.mockResolvedValue([{
        _id: 'mockedId',
        name: 'mockedName2',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1,
        createdBy: 'mockedCreatedBy'
      }]);

      await updateProduct(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith({
        data: [{
          _id: 'mockedId',
          name: 'mockedName2',
          description: 'mockedDescription',
          category: 'mockedCategory',
          price: 1,
          createdBy: 'mockedCreatedBy'
        }]
      });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId'
        },
        body: {
          name: 'mockedName2'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.updateProduct.mockRejectedValue({ error: 'Error updating products' });

      await updateProduct(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error updating products' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.deleteProduct.mockResolvedValue({ sucess: true });

      await deleteProduct(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith({ sucess: true });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId'
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      productService.deleteProduct.mockRejectedValue({ error: 'Error deleting products' });

      await deleteProduct(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error deleting products' });
    });
  });
});
