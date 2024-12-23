const userService = require("../services/userService.js");
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

    if (payload.rol_id_rol !== 2)
        return res.status(400).json({ message: "Unauthorized user" });

    try {
        const { 
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
        } = req.body;

        if (
            id_userDPI === undefined ||
            email === undefined ||
            full_name === undefined ||
            password === undefined ||
            phone === undefined ||
            birth_date === undefined ||
            status_id_status === undefined
        )
            return res
                .status(400)
                .json({ message: "Missing required information" });

        const user = {
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
        };

        const result = await userService.create(user);
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
            filterBy = 'name',
            filterValue = '',
            sortBy = 'id_userDPI', 
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

        const result = await userService.read(query);
        const message = "Productos encontrados exitosamente";
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
            id_userDPI,
            email = null,
            full_name = null,
            password = null,
            phone = null,
            birth_date = null,
            status_id_status = null,
        } = req.body;

        if (id_userDPI === undefined)
            return res
                .status(400)
                .json({ message: "Missing required information" });

        const user = {
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
        };

        const result = await userService.update(user);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in update:", err);
        res.status(500).json({ message: err.message });
    }
};