const authTypes = require("./authTypes");
const productTypes = require("./productType");

module.exports = {
    auth: authTypes.initModels,
    product: productTypes.initModels
};
