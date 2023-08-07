const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, _res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    console.error('❌ Authorization header not provided');
    return next(createError(401, 'Authorization header not provided'));
  }

  const [ bearer , token ] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    console.error('❌ Bearer not provided');
    return next(createError(401, 'Bearer not provided'));
  }

  if (!token) {
    console.error('❌ Token not provided');
    return next(createError(401, 'Token not provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET || 'super secret', (err, decoded) => {
    if (err) {
      console.error(`🔥 Error verifying jwt ${err}`);
      return next(createError(401));
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken
}