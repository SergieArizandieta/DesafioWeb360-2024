const productModel = require("../model/productModel");
const productUtil = require("../utils/productUtil");

exports.create = async (product) => {
    try {
        const pictureBuffer = Buffer.from(product.picture, 'base64');
        product.picture = pictureBuffer;
        const resultCreate = await productModel.sp_InsertProduct(product);
        
        if (!resultCreate.success) throw new Error(resultCreate.message);

        return resultCreate.message;
    } catch (err) {
        throw err;
    }
}; 

exports.read = async (query) => {
    try {
        
        let resultRead = await productModel.getProducts(query);
        const resultMapper = productUtil.mapperProducts(resultRead.rows);
        resultRead.rows = resultMapper;

        return resultRead;

    } catch (err) {
        throw err;
    }
};

exports.readAll = async (query) => {
    try {
        
        let resultRead = await productModel.getAllProducts(query);
        const resultMapper = productUtil.mapperProducts(resultRead.rows);
        resultRead.rows = resultMapper;

        return resultRead;

    } catch (err) {
        throw err;
    }
};


exports.update = async (product) => {
    try {
        if (product.picture){
            const pictureBuffer = Buffer.from(product.picture, 'base64');
            product.picture = pictureBuffer;
        }

        const resultUpdate = await productModel.sp_UpdateProduct(product);
        
        if (!resultUpdate.success) throw new Error(resultUpdate.message);

        return resultUpdate.message;
    } catch (err) {
        throw err;
    }
};