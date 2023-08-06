const { signup, signin, deleteUser } = require('../authCtrl');
const authService = require('../../services/authService');

jest.mock('../../services/authService');

describe('[authCtrl] unit test', () => {
  describe('signup', () => {
    it('should register an user', async () => {
      const reqMocked = {
        body: {
          name: 'nameMocked',
          email: 'a@mail.com',
          password: 'passwordMocked',
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      authService.signup.mockResolvedValue({
        _id: 'idMocked',
        name: 'nameMocked',
        email: 'a@mail.com',
      });

      await signup(reqMocked, resMocked, nextMocked);

      expect(resMocked.status).toHaveBeenCalledWith(201);
      expect(resMocked.json).toHaveBeenCalledWith({
        data: {
          _id: 'idMocked',
          name: 'nameMocked',
          email: 'a@mail.com'
        }
      });
    });

    it('should failed when something is wrong', async () => {
      const reqMocked = {
        body: {
          name: 'nameMocked',
          email: 'a@mail.com',
          password: 'passwordMocked',
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      authService.signup.mockRejectedValue('Error creating user');

      await signup(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    it('should return accessToken', async () => {
      const reqMocked = {
        body: {
          email: 'a@mail.com',
          password: 'passwordMocked',
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      authService.signin.mockResolvedValue({ accessToken: 'accessTokenMocked' });

      await signin(reqMocked, resMocked, nextMocked);

      expect(resMocked.status).toHaveBeenCalledWith(200);
      expect(resMocked.json).toHaveBeenCalledWith({ accessToken: 'accessTokenMocked' });
    });

    it('should return error if user can be logged', async () => {
      const reqMocked = {
        body: {
          email: 'noUser@mail.com',
          password: 'passwordMocked',
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        error: jest.fn(),
      };
      const nextMocked = jest.fn();

      authService.signin.mockResolvedValue({ error: 'Not Found' });

      await signin(reqMocked, resMocked, nextMocked);

      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toBeInstanceOf(Error);
    });

    it('should failed when something is wrong', async () => {
      const reqMocked = {
        body: {
          email: 'a@mail.com',
          password: 'passwordMocked',
        },
      };
      const resMocked = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const nextMocked = jest.fn();

      authService.signin.mockRejectedValue('Error logining user');

      await signin(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toEqual('Error logining user');
    });
  });

  describe('deleteUser ', () => {
    it('should delete an user', async () => {
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

      authService.deleteUser.mockResolvedValue({ sucess: true });

      await deleteUser(reqMocked, resMocked, nextMocked);

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

      authService.deleteUser.mockRejectedValue({ error: 'Error deleting user' });

      await deleteUser(reqMocked, resMocked, nextMocked);

      expect(resMocked.json).toHaveBeenCalledTimes(0);
      expect(resMocked.status).toHaveBeenCalledTimes(0);
      expect(nextMocked).toHaveBeenCalled();
      expect(nextMocked.mock.calls[0][0]).toEqual({ error: 'Error deleting user' });
    });
  });
});
