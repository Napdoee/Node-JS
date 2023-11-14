const { User } = require('../models');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).send({
        status: 'failed',
        error: [{
          path: "confirmPassword",
          message: "confirm password does not match"
        }],
      })
    }

    const newUser = await User.create({
      name,
      email,
      password
    })

    const token = signToken(newUser.id);

    return res.send({
      status: 'success',
      messsage: 'user success registered',
      token,
    })
  } catch (err) {
    const { errors } = err;

    return res.status(400).send({
      status: 'failed',
      errors: errors.map(error => ({
        path: error.path,
        message: error.message
      })),
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        status: 'failed',
        error: "Email or Password is required",
      })
    }

    const userData = await User.findOne({ where: { email } });

    if (!userData || !(await userData.CorretPassword(password, userData.password))) {
      return res.status(400).send({
        status: 'failed',
        error: "Email or Password is invalid",
      })
    }

    const token = signToken(userData.id);

    return res.send({
      status: 'success',
      messsage: 'user success login',
      token,
    })
  } catch (err) {
    return res.status(400).send({
      status: 'failed',
      errors: err.message,
    })
  }
}