const orderService = require("../services/orderService.js");
const authUtil = require("../utils/authUtil.js");


exports.create = async (req, res) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization;

    if (!refreshToken && !authHeader)
        return res.status(400).json({ message: "No token provided" });

    try {
        const accessToken = authHeader.split(" ")[1];
        var payload = authUtil.verifyAccessToken(accessToken);
    } catch (error) {
        console.error("Error in create: Token expired:", error);
        return res.status(401).json({ message: error.message });
    }

    try {
        const { 
            address,
            delivery_date,
            client_id_client,
            user_id_user,
            details,
         } = req.body;

        if (
            address === undefined ||
            delivery_date === undefined ||
            client_id_client === undefined ||
            user_id_user === undefined ||
            details === undefined ||
            details.length === 0
        )
            return res
                .status(400)
                .json({ message: "Missing required information" });

        const order = {
            address,
            delivery_date,
            client_id_client,
            user_id_user,
            details,
        };

        const result = await orderService.create(order);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in create:", err);
        res.status(500).json({ message: err.message });
    }
};


exports.read = async (req, res) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization;

    if (!refreshToken && !authHeader)
        return res.status(400).json({ message: 'No token provided' });
    
    // try{
    //     const accessToken = authHeader.split(" ")[1];
    //     authUtil.verifyAccessToken(accessToken);
    // }catch (error) {
    //     console.error('Error in create: Token expired:', error);
    //     return res.status(401).json({ message: error.message });
    // }

    try {
        const { 
            filterBy = 'id_order',
            filterValue = '',
            sortBy = 'total', 
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

        const result = await orderService.read(query);
        const message = "Ordenes encontrados exitosamente";
        res.status(200).json({ message: message, data: result });
    } catch (err) {
        console.error("Error in read:", err);
        res.status(500).json({ message: err.message });
    }
   
};

exports.update = async (req, res) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization;

    if (!refreshToken && !authHeader)
        return res.status(400).json({ message: "No token provided" });

    try {
        const accessToken = authHeader.split(" ")[1];
        var payload = authUtil.verifyAccessToken(accessToken);
    } catch (error) {
        console.error("Error in create: Token expired:", error);
        return res.status(401).json({ message: error.message });
    }

    if (payload.rol_id_rol !== 2)
        return res.status(400).json({ message: "Unauthorized user" });

    try {
        const { 
            id_order,
            address = null,
            delivery_date = null,
            client_id_client = null,
            user_id_user = null,
         } = req.body;

        if (id_order === undefined)
            return res
                .status(400)
                .json({ message: "Missing required information" });

        const order = {
            id_order,
            address,
            delivery_date,
            client_id_client,
            user_id_user,
        };

        const result = await orderService.update(order);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in update:", err);
        res.status(500).json({ message: err.message });
    }
};