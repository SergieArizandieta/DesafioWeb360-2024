const {models} = require("../types/authTypes");

const findOne = async (where, attributes = null) => {
  try {
    const options = {
      raw: true,
      where,
    };

    if (attributes) {
      options.attributes = attributes; 
    }

    const user = await models.User.findOne(options);
    return user;
  } catch (error) {
    throw new Error(`Error al buscar el usuario: ${error.message}`);
  }
};

exports.findOneByEmail = async (email, attributes = null) => {
  return await findOne({ email }, attributes);
};

exports.findOneById = async (id_userDPI, attributes = null) => {
  return await findOne({ id_userDPI }, attributes);
};

exports.updateRefreshToken = async (email, refresh_token) => {
  try {
    const updatedRows = await models.User.update(
      { refresh_token },
      {
        where: {
          email, 
        },
      }
    );

    return updatedRows;
  } catch (error) {
    throw new Error(`Error al actualizar el token de refresco: ${error.message}`);
  }
};
