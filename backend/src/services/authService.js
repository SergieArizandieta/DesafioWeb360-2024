const authModel = require('../model/authModel');
const authUtil = require("../utils/authUtil");

exports.login = async (email, password) => {
  try{
    const user = await authModel.findOneByEmail(email, ['id_userDPI', 'rol_id_rol', 'password']);
    if (!user) throw new Error('User not found');

    const isValidPassword = await authUtil.verifyPassword(password, user.password);
    
    if (!isValidPassword) throw new Error('Usuario o contraseña incorrectos');

    payload = {id_userDPI:user.id_userDPI,rol_id_rol:user.rol_id_rol};
    const AccJwt = authUtil.generateAccesToken(payload);
    const RefJwt = authUtil.generateRefreshToken(payload);

    await authModel.updateRefreshToken(email, RefJwt);
    
    return {AccJwt, RefJwt};
  }catch (err) {
      throw err;
  }
};

const verifyRefreshTokenDB = async (payload,refreshToken) => {
  try {
    const user = await authModel.findOneById(payload.id_userDPI, ['id_userDPI', 'email', 'rol_id_rol','refresh_token']);

    if (refreshToken !== user.refresh_token) throw new Error('Invalid refresh token');
    
    return user
  } catch (error) {
    console.log('Error in verifyRefreshToken:', error);
    throw error;
  } 
}

exports.refreshTokens = async (refreshToken) => {
  try {
    const payloadRefresh = authUtil.verifyRefreshToken(refreshToken);
    const user = await verifyRefreshTokenDB(payloadRefresh,refreshToken);

    const payload = {id_userDPI:user.id_userDPI,rol_id_rol:user.rol_id_rol};
    const AccJwt = authUtil.generateAccesToken(payload);
    const RefJwt = authUtil.updateRefreshToken(payload,payloadRefresh);

    await authModel.updateRefreshToken(user.email, RefJwt);

    return {AccJwt,RefJwt};
  } catch (error) {
    throw error;
  }
}

