const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }

  const [ bearer , token ] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'super secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken
}