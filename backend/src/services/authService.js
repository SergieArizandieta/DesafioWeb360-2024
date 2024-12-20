const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const User = require('../model/authModel');

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: "serchiboi", role: "123" }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};
