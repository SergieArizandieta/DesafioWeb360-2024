const orderModel = require("../model/orderModel");
const productDetail = require("../utils/detailsOrderUtil");

exports.create = async (order) => {
    try {
        const resultCreate = await orderModel.sp_FlowCreateOrder(order);
        
        if (!resultCreate.success) throw new Error(resultCreate.message);

        return resultCreate.message;
    } catch (err) {
        throw err;
    }

}; 

exports.readByClient = async (client_id_client) => {
    try {
        const resultRead = await orderModel.getOrdersByClient(client_id_client);
        const resultMapper = productDetail.mapperOrders(resultRead);

        return resultMapper;
    } catch (err) {
        throw err;
    }
};

exports.readDetailByOrder = async (id_order,client_id_client) => {
    try {
        const resultRead = await orderModel.getDetailByOrder(id_order,client_id_client);
        const resultMapper = productDetail.mapperDetailOrders(resultRead);
        
        return resultMapper;
    } catch (err) {
        throw err;
    }
};

exports.read = async (query) => {
    try {
        
        let resultRead = await orderModel.getOrders(query);
        resultRead.rows = productDetail.mapperOrders(resultRead.rows);

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
