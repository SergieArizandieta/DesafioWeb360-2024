const orderModel = require("../model/orderModel");

exports.create = async (order) => {
    try {
        const resultCreate = await orderModel.sp_FlowCreateOrder(order);
        
        if (!resultCreate.success) throw new Error(resultCreate.message);

        return resultCreate.message;
    } catch (err) {
        throw err;
    }

}; 


exports.read = async (query) => {
    try {
        
        let resultRead = await orderModel.getOrders(query);

        return resultRead;

    } catch (err) {
        throw err;
    }
};


exports.update = async (order) => {
    try {
        const resultUpdate = await orderModel.sp_UpdateOrder(order);
        
        if (!resultUpdate.success) throw new Error(resultUpdate.message);

        return resultUpdate.message;
    } catch (err) {
        throw err;
    }
};
