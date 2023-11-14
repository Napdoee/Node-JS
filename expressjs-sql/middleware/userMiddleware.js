const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authMiddleware = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.sendStatus(401);

  let decode;
  try {
    decode = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).send({
      status: 'failed',
      errors: 'token not found'
    });
  }

  const user = await User.findByPk(decode.id);
  if (!user) return res.sendStatus(401);

  req.user;

  next();
}