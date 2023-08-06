const { signup, signin, deleteUser } = require('../authCtrl');
const authService = require('../../services/authService');

jest.mock('../../services/authService');

describe('[authCtrl] unit test', () => {
  describe('signup', () => {
    it('should register an user', async () => {
      const mockedReq = {
        body: {
          name: 'mockedName',
          email: 'a@mail.com',
          password: 'mockedPassword',
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      authService.signup.mockResolvedValue({
        _id: 'mockedId',
        name: 'mockedName',
        email: 'a@mail.com',
      });

      await signup(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(201);
      expect(mockedRes.json).toHaveBeenCalledWith({
        _id: 'mockedId',
        name: 'mockedName',
        email: 'a@mail.com'
      });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        body: {
          name: 'mockedName',
          email: 'a@mail.com',
          password: 'mockedPassword',
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      authService.signup.mockRejectedValue('Error creating user');

      await signup(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    it('should return accessToken', async () => {
      const mockedReq = {
        body: {
          email: 'a@mail.com',
          password: 'mockedPassword',
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      authService.signin.mockResolvedValue({ accessToken: 'mockedAccessToken' });

      await signin(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith({ accessToken: 'mockedAccessToken' });
    });

    it('should return error if user can be logged', async () => {
      const mockedReq = {
        body: {
          email: 'noUser@mail.com',
          password: 'mockedPassword',
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        error: jest.fn(),
      };
      const mockedNext = jest.fn();

      authService.signin.mockResolvedValue({ error: 'Not Found' });

      await signin(mockedReq, mockedRes, mockedNext);

      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toBeInstanceOf(Error);
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        body: {
          email: 'a@mail.com',
          password: 'mockedPassword',
        },
      };
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockedNext = jest.fn();

      authService.signin.mockRejectedValue('Error logining user');

      await signin(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual('Error logining user');
    });
  });

  describe('deleteUser ', () => {
    it('should delete an user', async () => {
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

      authService.deleteUser.mockResolvedValue({ success: true });

      await deleteUser(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith({ success: true });
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

      authService.deleteUser.mockRejectedValue({ error: 'Error deleting user' });

      await deleteUser(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error deleting user' });
    });
  });
});
