const userModel = require("../model/userModel");
const authUtil = require("../utils/authUtil");

exports.create = async (user) => {
    try {
        user.password = await  authUtil.hashPassword(user.password);
        const resultCreate = await userModel.sp_InsertUser(user);
        
        if (!resultCreate.success) throw new Error(resultCreate.message);

        return resultCreate.message;
    } catch (err) {
        throw err;
    }
}; 


exports.read = async (query) => {
    try {
        
        let resultRead = await userModel.getUsers(query);

        return resultRead;

    } catch (err) {
        throw err;
    }
};
     
exports.update = async (user) => {
    try {
        if(user.password)
            user.password = await  authUtil.hashPassword(user.password);
        
        const resultUpdate = await userModel.sp_UpdateUser(user);
        
        if (!resultUpdate.success) throw new Error(resultUpdate.message);

        return resultUpdate.message;
    } catch (err) {
        throw err;
    }
};
