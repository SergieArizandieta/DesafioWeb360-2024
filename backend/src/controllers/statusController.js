const statusService = require("../services/statusService");
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
        const {name} = req.body;

        if (name === undefined)
            return res
                .status(400)
                .json({ message: "Missing required information" });

        const status = {
            name
        };

        const result = await statusService.create(status);
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
            sortBy = 'id_status', 
            sortOrder = 'ASC',
        } = req.query;

        const query = {
            filterBy,
            filterValue,
            sortBy,
            sortOrder,
        };

        const result = await statusService.read(query);
        const message = "Estado encontrados exitosamente";
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
            id_status,
            name = null,
        } = req.body;

        if (id_status === undefined || name === undefined)
            return res.status(400).json({ message: "Missing required information" });

        const status = {
            id_status,
            name,
        };

        const result = await statusService.update(status);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in update:", err);
        res.status(500).json({ message: err.message });
    }
};
