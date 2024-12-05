const jwt = require('jsonwebtoken');
import { JWT_ADMIN_PASSWORD } from '../config';

function adminMiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in"
    })
  }
}

module.exports = {
  adminMiddleware: adminMiddleware
}
