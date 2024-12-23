const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");

const routers = {
    auth: authRouter,
    product: productRouter,
    category: categoryRouter,
};

module.exports = routers;
