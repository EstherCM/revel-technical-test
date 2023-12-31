const { create, get, remove } = require('../userDAO');
const User = require('../../models/userModel');

describe('[userDAO] unit test', () => {
  describe('create', () => {
    const createMock = jest.fn();
    User.create = createMock;

    it('should create a user', async () => {
      const mockedNewUser = {
        name: 'mockedName',
        email: 'mockedEmail',
        password: 'mockedPassword'
      };

      const createdUser = { ...mockedNewUser, _id: 'mockedUserId', role: 'user' };
      createMock.mockResolvedValue(createdUser);

      const result = await create(mockedNewUser);

      expect(result).toBeDefined();
      expect(result._id).toEqual(createdUser._id);
      expect(result.name).toEqual(mockedNewUser.name);
      expect(result.email).toEqual(mockedNewUser.email);
      expect(result.password).toEqual(mockedNewUser.password);
      expect(result.role).toEqual('user');
    });

    it('should return error when user couldn\'t be created', async () => {
      const mockedNewUser = {
        name: 'mockedName',
        email: 'mockedEmail',
        password: 'mockedPassword'
      };

      const mockedError = new Error('Error creating user');
      createMock.mockRejectedValue(mockedError);

      try {
        await create(mockedNewUser);
      } catch (e) {
        expect(e).toEqual(mockedError);
      }
    });
  });

  describe('get', () => {
    const getMock = jest.fn();
    User.findOne = getMock;

    it('should get a user', async () => {
      const users = [
        {
          _id: '1',
          name: 'User 1',
          email: '1@mail.com',
          password: 'password 1',
          role: 'admin'
        },
        {
          _id: '2',
          name: 'User 2',
          email: '2@mail.com',
          password: 'password 2',
          role: 'agent'
        },
      ];

      getMock.mockResolvedValue(users[0]);

      const result = await get({ _id: '1' });

      expect(result).toEqual(users[0]);
      expect(getMock).toHaveBeenCalledWith({ _id: '1' });
    });

    it('should return error when user couldn\'t be returned', async () => {
      const mockedError = new Error('Error getting user');
      getMock.mockRejectedValue(mockedError);

      try {
        await get({ _id: '1' });
      } catch (e) {
        expect(e).toEqual(mockedError);
      }
    });
  });

  describe('remove', () => {
    const deleteMock = jest.fn();
    User.deleteOne = deleteMock;

    it('should delete a user', async () => {
      const id = 'mockedId';
      const mockResult = { deletedCount: 1 };
      deleteMock.mockResolvedValue(mockResult);

    const result = await remove(id);

    expect(result).toEqual(mockResult);
    expect(deleteMock).toHaveBeenCalledWith({ _id: id });
    });

    it('should return error when user couldn\'t be removed', async () => {
      const id = 'mockedId';
      const mockError = new Error('Error deleting user');
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
