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
    console.error("Err in findOne: ", error);
    throw new Error(`Error al buscar el usuario`);
  }
};

exports.findOneByEmail = async (email, attributes = null, status_id_status=1) => {
  return await findOne({ email, status_id_status }, attributes);
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
    console.error("Err in updateRefreshToken: ", error);
    throw new Error(`Error al actualizar el token de refresco: ${error.message}`);
  }
};
