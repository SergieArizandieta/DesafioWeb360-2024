const clientModel = require("../model/clientModel");
const authUtil = require("../utils/authUtil");

exports.create = async (client) => {
    try {
         client.password = await  authUtil.hashPassword(client.password);
         const resultCreate = await clientModel.sp_FlowCreateClient(client);
        
         if (!resultCreate.success) throw new Error(resultCreate.message);

         return resultCreate.message;
    } catch (err) {
        throw err;
    }
}; 

exports.update = async (client) => {
    try {
        if(client.password)
         client.password = await  authUtil.hashPassword(client.password);
      
        const resultUpdate = await clientModel.sp_FlowUpdateClient(client);
        
        if (!resultUpdate.success) throw new Error(resultUpdate.message);

        return resultUpdate.message;
    } catch (err) {
        throw err;
    }
};
