const categoryService = require("../services/categoryService.js");
const authUtil = require("../utils/authUtil.js");

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
            sortBy = 'id_category', 
            sortOrder = 'ASC',
        } = req.query;

        const query = {
            filterBy,
            filterValue,
            sortBy,
            sortOrder,
        };

        const result = await categoryService.read(query);
        const message = "Productos encontrados exitosamente";
        res.status(200).json({ message: message, data: result });
    } catch (err) {
        console.error("Error in read:", err);
        res.status(500).json({ message: err.message });
    }
   
};

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
        const { name, status_id_status } = req.body;

        if (name === undefined || status_id_status === undefined)
            return res
                .status(400)
                .json({ message: "Missing required information" });

        const category = {
            name,
            status_id_status,
        };

        const result = await categoryService.create(category);
        res.status(200).json({ message: result });
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
            id_category,
            name = null,
            status_id_status = null
        } = req.body;

        if (id_category === undefined)
            return res.status(400).json({ message: "Missing required information" });

        const category = {
            id_category,
            name,
            status_id_status,
        };

        const result = await categoryService.update(category);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error in update:", err);
        res.status(500).json({ message: err.message });
    }
};
