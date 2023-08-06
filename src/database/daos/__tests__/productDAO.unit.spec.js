const { create, getBy, update, remove } = require('../productDAO');
const Product = require('../../models/productModel');

describe('[productDAO] unit test', () => {
  describe('create', () => {
    const createMock = jest.fn();
    Product.create = createMock;

    it('should create a product', async () => {
      const mockedNewProduct = {
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 95,
        createdBy: 'mockedCreatedBy',
      };

      const createdProduct = { ...mockedNewProduct, _id: 'mockedUserId' };
      createMock.mockResolvedValue(createdProduct);

      const result = await create(mockedNewProduct);

      expect(result).toBeDefined();
      expect(result._id).toBe(createdProduct._id);
      expect(result.name).toBe(mockedNewProduct.name);
      expect(result.description).toBe(mockedNewProduct.description);
      expect(result.category).toBe(mockedNewProduct.category);
      expect(result.price).toBe(mockedNewProduct.price);
      expect(result.createdBy).toBe(mockedNewProduct.createdBy);
    });

    it('should return error when product couldn\'t be created', async () => {
      const mockedNewProduct = {
        name: 'mockedName',
        description: 'mockedDescription',
        category: 'mockedCategory',
        price: 95,
        createdBy: 'mockedCreatedBy',
      };

      const mockedError = new Error('Error creating product');
      createMock.mockRejectedValue(mockedError);

      try {
        await create(mockedNewProduct);
      } catch (e) {
        expect(e).toEqual(mockedError);
      }
    });
  });

  describe('getBy', () => {
    const getMock = jest.fn();
    Product.find = getMock;

    it('should get a product', async () => {
      const products = [
        {
          _id: '1',
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          price: 1
        },
        {
          _id: '2',
          name: 'Product 2',
          description: 'Description 2',
          category: 'Category 2',
          price: 2
        },
      ];

      getMock.mockResolvedValue(products[0]);

      const result = await getBy({ name: 'Product 1' });

      expect(result).toEqual(products[0]);
      expect(getMock).toHaveBeenCalledWith({ name: 'Product 1' });
    });

    it('should return error when product couldn\'t be returned', async () => {
      const mockedError = new Error('Error getting product');
      getMock.mockRejectedValue(mockedError);

      try {
        await getBy({ name: 'Product 1' });
      } catch (e) {
        expect(e).toEqual(mockedError);
      }
    });
  });

  describe('update', () => {
    const updateMock = jest.fn();
    Product.findByIdAndUpdate = updateMock;

    it('should update a product', async () => {
      const updatedProductData = {
        _id: '1',
        name: 'Product 1 updated',
        description: 'Description 1',
        category: 'Category 1',
        price: 1
      };
      const id = 'mockedId';
      const mockResult = { _id: id, ...updatedProductData };
      updateMock.mockResolvedValue(mockResult);

      const result = await update(id, updatedProductData);

      expect(result).toEqual(mockResult);
      expect(updateMock).toHaveBeenCalledWith({ _id: id }, updatedProductData, { new: true });
    });

    it('should return error when product couldn\'t be returned', async () => {
      const updatedProductData = {
        _id: '1',
        name: 'Product 1 updated',
        description: 'Description 1',
        category: 'Category 1',
        price: 1
      };
      const id = 'mockedId';
      const mockError = new Error('Error updating product');
      updateMock.mockRejectedValue(mockError);

      try {
        await update(id, updatedProductData);
      } catch (e) {
        expect(e).toEqual(mockError);
      }
      expect(updateMock).toHaveBeenCalledWith({ _id: id }, updatedProductData, { new: true });
    });
  });

  describe('remove', () => {
    const deleteMock = jest.fn();
    Product.deleteOne = deleteMock;

    it('should delete a product', async () => {
      const id = 'mockedId';
      const mockResult = { deletedCount: 1 };
      deleteMock.mockResolvedValue(mockResult);

    const result = await remove(id);

    expect(result).toEqual(mockResult);
    expect(deleteMock).toHaveBeenCalledWith({ _id: id });
    });

    it('should return error when product couldn\'t be removed', async () => {
      const id = 'mockedId';
      const mockError = new Error('Error deleting product');
      deleteMock.mockRejectedValue(mockError);

      try {
        await remove(id);
      } catch (e) {
        expect(e).toEqual(mockError);
      }
      expect(deleteMock).toHaveBeenCalledWith({ _id: id });
    });
  });
});
