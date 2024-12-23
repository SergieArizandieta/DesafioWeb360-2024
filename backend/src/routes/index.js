const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const statusRouter = require("./statusRouter");

const routers = {
    auth: authRouter,
    product: productRouter,
    category: categoryRouter,
    status: statusRouter
};

module.exports = routers;
