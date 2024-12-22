const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
   try {
      const hashedPassword = await argon2.hash(password, {
         type: argon2.argon2id,
         memoryCost: 2 ** 16,
         timeCost: 3,
         parallelism: 2,
      });
      return hashedPassword;
   } catch (error) {
      console.error("Error al hashear la contraseña:", error);
      throw error;
   }
}

async function verifyPassword(password, storedHash) {
   try {
      return await argon2.verify(storedHash, password);
   } catch (error) {
      throw error;
   }
}

function generateAccesToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' }); 
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

function updateRefreshToken(payload,token) {
   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: token.exp - Math.floor(Date.now() / 1000) });
}

module.exports = { 
   hashPassword,
   verifyPassword,
   generateAccesToken,
   generateRefreshToken,
   verifyAccessToken,
   verifyRefreshToken,
   updateRefreshToken
 };
