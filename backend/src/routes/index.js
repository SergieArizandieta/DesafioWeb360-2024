const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const statusRouter = require("./statusRouter");
const userRouter = require("./userRouter");

const routers = {
    auth: authRouter,
    product: productRouter,
    category: categoryRouter,
    status: statusRouter,
    user: userRouter,
};

module.exports = routers;
