const userModel = require('../userTypes').models;
const clientModel = require('../clientTypes').models;


const initRelationShip = async () => {
   try {

      userModel.User.hasOne(clientModel.Client, {
         foreignKey: 'id_clientDPI',
         as: 'client',
      });

      clientModel.Client.belongsTo(userModel.User, {
         foreignKey: 'id_clientDPI',
         as: 'user',
      });

   }catch (error) {
      console.error('Error initializing database:', error);
   }

};

module.exports = { initRelationShip };
