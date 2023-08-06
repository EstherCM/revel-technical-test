const userDAO = require('../database/daos/userDAO');
const productDAO = require('../database/daos/productDAO');
const createError = require('http-errors');

const validSignUpEvent = (req, _res, next) => {
  const { body: { name, email, password } } = req;

  if (!name || !email || !password) {
    return next(createError(400, 'Bad Request: Some properties are missing'));
  }

  next();
};

const checkDuplicateEmail = async (req, _res, next) => {
  try {
    const foundUser = await userDAO.get({ email: req.body.email });

    if (foundUser) {
      return next(createError(400, 'Bad Request: Email is already in use'));
    }
    next();
  } catch(e) {
    console.error(`🔥 Error finding user by email ${e}`);
    return next(e);
  }
};

const validSignInEvent = (req, _res, next) => {
  const { body: { email, password } } = req;

  if (!email || !password) {
    return next(createError(400, 'Bad Request: Some properties are missing'));
  }

  next();
};

const checkPermissions = (req, _res, next) => {
  if (req.user.role !== 'admin') {
    console.error('❌ No admin');
    return next(createError(401));
  }
  next();
};

const dataSecurity = async (req, _res, next) => {
  const { user: { role, id: userId }, params: { id: productId } } = req;

  if (role !== 'admin') {
    try {
      const [ foundProduct ] = await productDAO.getBy({ _id: productId });
  
      if (!foundProduct) {
        console.error('❌ Product not found', productId);
        return next(createError(404));
      }

      if (foundProduct.createdBy != userId) {
        console.error('❌ Product owns another user', foundProduct, foundProduct.createdBy, userId);
        return next(createError(401));
      }
      return next();
    } catch(e) {
      console.error(`🔥 Error finding product by id ${e}`);
      return next(e);
    }
  }
  next();
};

module.exports = {
  validSignUpEvent,
  checkDuplicateEmail,
  validSignInEvent,
  checkPermissions,
  dataSecurity
}