const productService = require("../services/productService");
const authUtil = require('../utils/authUtil.js');

exports.read = async (req, res) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization;

    if (!refreshToken && !authHeader)
        return res.status(400).json({ message: 'No token provided' });
    
    try{
        const accessToken = authHeader.split(" ")[1];
        authUtil.verifyAccessToken(accessToken);
    }catch (error) {
        console.error('Error in create: Token expired:', error);
        return res.status(401).json({ message: error.message });
    }

    try {
        const { 
            filterBy = 'name',
            filterValue = '',
            sortBy = 'id_product', 
            sortOrder = 'ASC',
            page = 1,            
            limit = 10         
        } = req.query;

        const query = {
            filterBy,
            filterValue,
            sortBy,
            sortOrder,
            page,
            limit
        };

        const result = await productService.read(query);
        const message = "Productos encontrados exitosamente";
        res.status(200).json({ message: message, data: result });
    } catch (err) {
        console.error("Error in create:", err);
        res.status(500).json({ message: err.message });
    }
   
};

exports.update = async (req, res) => {
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
            id_product ,
            name = null,
            brand = null,
            code = null,
            stock = null,
            price = null,
            creation_date = null,
            picture = null,
            category_id_category = null,
            status_id_status = null,
        } = req.body;

        if (id_product === undefined)
            return res.status(400).json({ message: "Missing required information" });

        const product = {
            id_product,
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

        const result = await productService.update(product);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in create:", err);
        res.status(500).json({ message: err.message });
    }
};


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
            name === undefined ||
            brand === undefined ||
            code === undefined ||
            stock === undefined ||
            price === undefined ||
            creation_date === undefined ||
            picture === undefined ||
            category_id_category === undefined ||
            status_id_status === undefined
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
