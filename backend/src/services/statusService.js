const statusModel = require("../model/statusModel");

exports.create = async (status) => {
    try {
        const resultCreate = await statusModel.sp_InsertStatus(status);
        
        if (!resultCreate.success) throw new Error(resultCreate.message);

        return resultCreate.message;
    } catch (err) {
        throw err;
    }
}; 


exports.read = async (query) => {
    try {
        
        let resultRead = await statusModel.getStatus(query);

        return resultRead;

    } catch (err) {
        throw err;
    }
};

    

exports.update = async (status) => {
    try {
        const resultUpdate = await statusModel.sp_UpdateStatus(status);
        
        if (!resultUpdate.success) throw new Error(resultUpdate.message);

        return resultUpdate.message;
    } catch (err) {
        throw err;
    }
};
