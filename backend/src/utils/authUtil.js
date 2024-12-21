const argon2 = require("argon2");

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

module.exports = { hashPassword, verifyPassword };
