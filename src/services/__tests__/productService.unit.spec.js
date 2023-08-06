const { createProduct, getProducts, updateProduct, deleteProduct } = require('../productService');
const productDAO = require('../../database/daos/productDAO');

jest.mock('../../database/daos/productDAO');

describe('[productService] unit test', () => {
  describe('createProduct', () => {
    it('should call productDAO.create', async () => {
      const mockedProduct = {
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1
      };
      const createdBy = 'mockedCreatedBy';

      await createProduct(mockedProduct, createdBy);

      expect(productDAO.create).toHaveBeenCalledWith({ ...mockedProduct, createdBy });
    });

    it('should failed when something is wrong', async () => {
      const mockedProduct = {
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1,
      };
      const createdBy = 'mockedCreatedBy';
      const mockedError = new Error('Error creating product');
      productDAO.create.mockRejectedValueOnce({ error: mockedError });

      const result = await createProduct(mockedProduct, createdBy);

      await expect(result.error).toEqual({ error: mockedError });
      expect(productDAO.create).toHaveBeenCalledWith({ ...mockedProduct, createdBy });
    });
  });

  describe('getProducts', () => {
    it('should find product', async () => {
      const mockedProduct = {
        name: 'mockedName2',
      };

      await getProducts(mockedProduct);

      expect(productDAO.getBy).toHaveBeenCalledWith(mockedProduct);
    });

    it('should failed when something is wrong', async () => {
      const mockedProduct = {
        name: 'mockedName2',
      };
      const mockedError = new Error('Error getting product');
      productDAO.getBy.mockRejectedValueOnce({ error: mockedError });

      const result = await getProducts(mockedProduct);

      await expect(result.error).toEqual({ error: mockedError });
      expect(productDAO.getBy).toHaveBeenCalledWith(mockedProduct);
    });
  });

  describe('updateProduct', () => {
    it('should call productDAO.updateProduct', async () => {
      const id = 'mockedId';
      const mockedProduct = {
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1
      };

      await updateProduct(id, mockedProduct);

      expect(productDAO.update).toHaveBeenCalledWith(id, mockedProduct);
    });

    it('should failed when something is wrong', async () => {
      const id = 'mockedId';
      const mockedProduct = {
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 1
      };

      const mockedError = new Error('Error deleting product');
      productDAO.update.mockRejectedValueOnce({ error: mockedError });

      const result = await updateProduct(id, mockedProduct);

      await expect(result.error).toEqual({ error: mockedError });
      expect(productDAO.update).toHaveBeenCalledWith(id, mockedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should call productDAO.remove', async () => {
      const id = 'mockedId';

      await deleteProduct(id);

      expect(productDAO.remove).toHaveBeenCalledWith(id);
    });

    it('should return success', async () => {
      const id = 'mockedId';

      productDAO.remove.mockResolvedValue({ deletedCount: 1 });

      const result = await deleteProduct(id);

      expect(result).toEqual({ success: true });
    });

    it('should return error if prodcuct can\'t be deleted', async () => {
      const id = 'mockedId';

      productDAO.remove.mockResolvedValue({ deletedCount: 0 });

      const result = await deleteProduct(id);

      expect(result.error).toEqual('Something was wrong. Product couldn\'t be removed');
    });

    it('should failed when something is wrong', async () => {
      const id = 'mockedId';

      const mockedError = new Error('Error deleting product');
      productDAO.remove.mockRejectedValueOnce({ error: mockedError });

      const result = await deleteProduct(id);

      await expect(result.error).toEqual({ error: mockedError });
      expect(productDAO.remove).toHaveBeenCalledWith(id);
    });
  });
});
