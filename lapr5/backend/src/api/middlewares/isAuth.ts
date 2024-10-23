import jwt from 'jsonwebtoken'; // Import the correct jwt module

import config from '../../../config';

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] }, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.token = decodedToken; // Store the decoded token in the request object
    next();
  });
};

export default isAuth;
