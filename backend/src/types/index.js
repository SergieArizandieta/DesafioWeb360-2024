const authTypes = require("./authTypes");
const productTypes = require("./productType");
const categoryTypes = require("./categoryTypes");

module.exports = {
    auth: authTypes.initModels,
    product: productTypes.initModels,
    category: categoryTypes.initModels,
};
