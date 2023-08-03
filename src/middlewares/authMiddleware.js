const User = require('../database/models/userModel');
const Product = require('../database/models/productModel');

const validSignUpEvent = (req, res, next) => {
  const { body: { name, email, password, role } } = req;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  next();
};

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
      return res.status(400).json({ message: 'Bad Request: Email is already in use' });
    }
    next();
  } catch(e) {
    console.error(`🔥 Error finding user by email ${e}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const validSignInEvent = (req, res, next) => {
  const { body: { email, password } } = req;

  if (!email || !password) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  next();
};

const checkPermissions = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.error('❌ No admin');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

const dataSecurity = async (req, res, next) => {
  const { user: { role, id: userId }, params: { id: productId } } = req;

  if (role !== 'admin') {
    try {
      const foundProduct = await Product.findOne({ id: productId });
  
      if (!foundProduct) {
        return res.status(404).json({ message: 'Not found' });
      }

      if (foundProduct.createdBy !== userId) {
        console.error('❌ Product owns another user');
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    } catch(e) {
      console.error(`🔥 Error finding product by id ${e}`);
      return res.status(500).json({ message: 'Internal server error' });
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