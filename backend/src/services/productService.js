const productModel = require("../model//productModel");

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
