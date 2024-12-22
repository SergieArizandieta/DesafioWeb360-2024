const crypto = require('crypto');

function generateJWTSecret() {
    // Genera una clave secreta aleatoria de 32 bytes en formato base64
    return crypto.randomBytes(32).toString('base64');
}

// Ejemplo de uso
const jwtSecret = generateJWTSecret();
console.log("JWT Secret:", jwtSecret);
