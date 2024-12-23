const categoryModel = require("../model/categoryModel");

exports.create = async (category) => {
    try {
        const resultCreate = await categoryModel.sp_InsertCategory(category);
        
        if (!resultCreate.success) throw new Error(resultCreate.message);

        return resultCreate.message;
    } catch (err) {
        throw err;
    }


}; 

exports.read = async (query) => {
    try {
        
        let resultRead = await categoryModel.getCategories(query);

        return resultRead;

    } catch (err) {
        throw err;
    }
};

     
exports.update = async (category) => {
    try {
        const resultUpdate = await categoryModel.sp_UpdateCategory(category);
        
        if (!resultUpdate.success) throw new Error(resultUpdate.message);

        return resultUpdate.message;
    } catch (err) {
        throw err;
    }
};
