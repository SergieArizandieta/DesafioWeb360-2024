const productService = require("../services/productService");
const authUtil = require('../utils/authUtil.js');

exports.create = async (req, res) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization;

    if (!refreshToken && !authHeader)
        return res.status(400).json({ message: 'No token provided' });
    

    try{
        const accessToken = authHeader.split(" ")[1];
        var payload = authUtil.verifyAccessToken(accessToken);
    }catch (error) {
        console.error('Error in create: Token expired:', error);
        return res.status(401).json({ message: error.message });
    }

    if (payload.rol_id_rol !== 2)
        return res.status(400).json({ message: 'Unauthorized user' });
    

    try {
        const {
            name,
            brand,
            code,
            stock,
            price,
            creation_date,
            picture,
            category_id_category,
            status_id_status,
        } = req.body;

        if (
            !name ||
            !brand ||
            !code ||
            !stock ||
            !price ||
            !creation_date ||
            !picture ||
            !category_id_category ||
            !status_id_status
        )
            return res.status(400).json({ message: "Missing required information" });

        const product = {
            name,
            brand,
            code,
            stock,
            price,
            creation_date,
            picture,
            category_id_category,
            status_id_status,
        };

        const result = await productService.create(product);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in create:", err);
        res.status(500).json({ message: err.message });
    }
};
