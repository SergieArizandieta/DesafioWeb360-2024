const {models} = require("../types/authTypes");

exports.findOne = async (email) => {

  const users = await models.User.findOne({
    raw: true, 
    where: {
      email, 
    },
  });
  
  return users;
};
