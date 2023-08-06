const { signup, signin, deleteUser } = require('../authService');
const userDAO = require('../../database/daos/userDAO');
const jwt = require('jsonwebtoken');

jest.mock('../../database/daos/userDAO');

describe('[authService] unit test', () => {
  describe('signup', () => {
    it('should call userDAO.create', async () => {
      const mockedUser = {
        name: 'mockedName',
        email: '1@mail.com',
        password: 'mockedPassword',
        role: 'mockedRole'
      };

      await signup(mockedUser);

      expect(userDAO.create).toHaveBeenCalledWith(mockedUser);
    });

    it('should failed when something is wrong', async () => {
      const mockedUser = {
        name: 'mockedName',
        email: '1@mail.com',
        password: 'mockedPassword',
        role: 'mockedRole'
      };
      const mockedError = new Error('Error creating user');
      userDAO.create.mockRejectedValueOnce({ error: mockedError });

      const result = await signup(mockedUser);

      await expect(result.error).toEqual({ error: mockedError });
      expect(userDAO.create).toHaveBeenCalledWith(mockedUser);
    });
  });

  describe('signin', () => {
    it('should find user by email', async () => {
      const mockedUser = {
        email: '1@mail.com',
        password: 'mockedPassword'
      };

      await signin(mockedUser);

      expect(userDAO.get).toHaveBeenCalledWith({ email: mockedUser.email });
    });

    it('should return error if user is not found', async () => {
      const mockedUser = {
        email: '1@mail.com',
        password: 'mockedPassword'
      };

      const result = await signin(mockedUser);

      expect(result.error).toEqual('Not Found');
    });

    it('should compare event password to saved password', async () => {
      const mockedUser = {
        email: '1@mail.com',
        password: 'mockedPassword'
      };

      const loggedUser = {
        _id: 'mockedId',
        name: 'mockedName',
        email: '1@mail.com',
        password: 'mockedPassword',
        role: 'user',
        checkPassword: jest.fn().mockResolvedValue(true),
      };

      const mockToken = 'mockedAccessToken';
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      userDAO.get.mockResolvedValue(loggedUser);

      await signin(mockedUser);

      expect(loggedUser.checkPassword).toHaveBeenCalledWith('mockedPassword');
    });

    it('should return error when not matching passwords', async () => {
      const mockedUser = {
        email: '1@mail.com',
        password: 'mockedPassword'
      };

      const loggedUser = {
        _id: 'mockedId',
        name: 'mockedName',
        email: '1@mail.com',
        password: 'mockedPassword',
        role: 'user',
        checkPassword: jest.fn().mockResolvedValue(false),
      };

      userDAO.get.mockResolvedValue(loggedUser);

      const result = await signin(mockedUser);

      expect(result.error).toEqual('Email or password incorrect');
    });

    it('should return accessToken', async () => {
      const mockedUser = {
        email: '1@mail.com',
        password: 'mockedPassword'
      };

      const loggedUser = {
        _id: 'mockedId',
        name: 'mockedName',
        email: '1@mail.com',
        password: 'mockedPassword',
        role: 'user',
        checkPassword: jest.fn().mockResolvedValue(true),
      };

      const mockToken = 'mockedAccessToken';
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      userDAO.get.mockResolvedValue(loggedUser);

      const result = await signin(mockedUser);

      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toEqual({ accessToken: mockToken });
    });

    it('should failed when something is wrong', async () => {
      const mockedUser = {
        email: '1@mail.com',
        password: 'mockedPassword'
      };
      const mockedError = new Error('Error in login');
      userDAO.get.mockRejectedValueOnce({ error: mockedError });

      const result = await signin(mockedUser);

      await expect(result.error).toEqual({ error: mockedError });
      expect(userDAO.get).toHaveBeenCalledWith({ email: mockedUser.email });
    });
  });

  describe('deleteUser', () => {
    it('should call userDAO.remove', async () => {
      const id = 'mockedId';

      await deleteUser(id);

      expect(userDAO.remove).toHaveBeenCalledWith(id);
    });

    it('should return success', async () => {
      const id = 'mockedId';

      userDAO.remove.mockResolvedValue({ deletedCount: 1 });

      const result = await deleteUser(id);

      expect(result).toEqual({ success: true });
    });

    it('should return error if user can\'t be deleted', async () => {
      const id = 'mockedId';

      userDAO.remove.mockResolvedValue({ deletedCount: 0 });

      const result = await deleteUser(id);

      expect(result.error).toEqual('Something was wrong. User couldn\'t be removed');
    });

    it('should failed when something is wrong', async () => {
      const id = 'mockedId';

      const mockedError = new Error('Error deleting user');
      userDAO.remove.mockRejectedValueOnce({ error: mockedError });

      const result = await deleteUser(id);

      await expect(result.error).toEqual({ error: mockedError });
      expect(userDAO.remove).toHaveBeenCalledWith(id);
    });
  });
});
