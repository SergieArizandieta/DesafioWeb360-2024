const authTypes = require("./authTypes");
const productTypes = require("./productType");
const categoryTypes = require("./categoryTypes");
const statusTypes = require("./statusTypes");

module.exports = {
    auth: authTypes.initModels,
    product: productTypes.initModels,
    category: categoryTypes.initModels,
    status: statusTypes.initModels
};
