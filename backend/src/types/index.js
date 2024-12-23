const authTypes = require("./authTypes");
const productTypes = require("./productType");
const categoryTypes = require("./categoryTypes");
const statusTypes = require("./statusTypes");
const userTypes = require("./userTypes");
const clientTypes = require("./clientTypes");
const orderTypes = require("./orderTypes");


const UserClient = require("./relationships/UserClient");

module.exports = {
    auth: authTypes.initModels,
    product: productTypes.initModels,
    category: categoryTypes.initModels,
    status: statusTypes.initModels,
    user: userTypes.initModels,
    client: clientTypes.initModels,
    order: orderTypes.initModels,


    UserClient: UserClient.initRelationShip
};
