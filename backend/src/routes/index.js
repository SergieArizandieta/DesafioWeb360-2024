const authRouter = require("./authRouter");
const productRouter = require("./productRouter");

const routers = {
    auth: authRouter,
    product: productRouter
};

module.exports = routers;
