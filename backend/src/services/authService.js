const jwt = require('jsonwebtoken');
const User = require('../model/authModel');
const { hashPassword, verifyPassword } = require("../utils/authUtil");

exports.login = async (email, password) => {
  try{
    const user = await User.findOne(email);
    if (!user) throw new Error('User not found');

    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) throw new Error('Usuario o contraseña incorrectos');

    const token = jwt.sign({ id: "serchiboi", role: "123" }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }catch (err) {
      throw err;
  }
};
