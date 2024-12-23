const connectToDatabase = require("../data/dbConnection");
const { models } = require("../types/userTypes");


exports.getUsers = async (query) => {
   try {
      const sequelize = await connectToDatabase();
      const offset = (query.page - 1) * query.limit;

      const where = query.filterValue
         ? {
              [query.filterBy]: {
                 [sequelize.Op.like]: `%${query.filterValue}%`,
              },
           }
         : {};

      const categories = await models.User.findAndCountAll({
         where,
         raw: true,
         order: [[query.sortBy, query.sortOrder.toUpperCase()]],
         limit: parseInt(query.limit),
         offset: parseInt(offset),
      });
    
      return categories;
   } catch (error) {
      console.error("Error en getUsers:", error);
      throw new Error(`Error al obtener los productos`);
   }
};


exports.sp_UpdateUser = async (user) => {
   const {
      id_userDPI,
      email,
      full_name,
      password,
      phone,
      birth_date,
      status_id_status,
   } = user;

   const rol_id_rol = 2;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_UpdateUser 
            @id_userDPI = :id_userDPI,
            @email = :email,
            @full_name = :full_name,
            @password = :password,
            @phone = :phone,
            @birth_date = :birth_date,
            @status_id_status = :status_id_status,
            @rol_id_rol = :rol_id_rol,
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
            rol_id_rol ,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_UpdateUser:", error);
      return { success: false, message: error.message };
   }
};


exports.sp_InsertUser = async (user) => {
   const {
      id_userDPI,
      email,
      full_name,
      password,
      phone,
      birth_date,
      status_id_status,
   } = user;

   const rol_id_rol = 2;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_InsertUser 
            @id_userDPI = :id_userDPI,
            @email = :email,
            @full_name = :full_name,
            @password = :password,
            @phone = :phone,
            @birth_date = :birth_date,
            @status_id_status = :status_id_status,
            @rol_id_rol = :rol_id_rol,
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
            rol_id_rol ,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_InsertUser:", error);
      return { success: false, message: error.message };
   }
};
